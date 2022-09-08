const StudentModel = require('../models/StudentModel');
const StudentBooksModel = require('../models/StudentBooksModel');
const BookModel = require('../models/BookModel');

module.exports = {
    async index() {
        await StudentModel.findAll({
            attributes: ['name', 'registration', 'birth_date'],
        });
    },

    store(data) {
        return StudentModel.create(data);
    },

    show(filter) {
        return StudentModel.findOne({
            where: filter
        })
    },

    update(filter, changes) {
        return StudentModel.update(changes, {
            where: filter,
        });
    },

    async delete(filter) {
        await this.show(filter);

        return StudentModel.destroy({
            where: filter
        });
    },

    async reservation({ student_id, book_ids }) {

        //verifica se existe o livro no banco
        const books = await BookModel.count({
            where: {
                id: book_ids
            }
        });
        
        if (books !== book_ids.length) {
            throw new Error('This book is not available!');
        }

        //verifica se o livro já foi reservado
        const reservedBooks = await StudentBooksModel.count({
            where: {
                book_id: book_ids
            }
        });

        if (reservedBooks) {
            throw new Error('This reservation was already made!');
        }

        //retorna todos os livros que o estudante solicitou reserva
        const booksRegistered = await StudentBooksModel.findAll({
            where: {
                student_id
            },
            attributes: ['book_id']
        });

        const booksRegisteredIds = booksRegistered.map(item => item.book_id);
        const booksToCreate = [];
        const booksToDelete = [];

        booksRegisteredIds.forEach(bookId => {
            if (!book_ids.includes(bookId)) {
                booksToDelete.push(bookId)
            }
        });

        book_ids.forEach(bookId => {
            if (!booksRegisteredIds.includes(bookId)) {
                booksToCreate.push({
                    student_id: student_id,
                    book_id: bookId,
                })
            }
        });

        await StudentBooksModel.destroy({
            where: {
                book_id: booksToDelete,
                student_id: student_id,
            }
        })

        return StudentBooksModel.bulkCreate(booksToCreate);
    },
};