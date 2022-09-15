const StudentModel = require('../models/StudentModel');
const StudentBooksModel = require('../models/StudentBooksModel');
const BookModel = require('../models/BookModel');
const moment = require('moment');

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
                book_id: book_ids,
                return_date: null,
            }
        });

        if (reservedBooks) {
            throw new Error('This reservation was already made!');
        }

        //retorna todos os livros que o estudante solicitou reserva
        // const booksRegistered = await StudentBooksModel.findAll({
        //     where: {
        //         student_id
        //     },
        //     attributes: ['book_id']
        // });

        const booksToCreate = [];

        book_ids.forEach(bookId => {
            booksToCreate.push({
                student_id: student_id,
                book_id: bookId,
                delivery_prediction: moment().add(3, 'days').format('YYYY-MM-DD'),
            })
        });

        console.log(booksToCreate);

        return StudentBooksModel.bulkCreate(booksToCreate);
    },

    async returnDate({ student_id, book_ids }) {
        const totalReservations = await StudentBooksModel.count({
          where: {
            student_id,
            book_id: book_ids,
            return_date: null
          },
        });
    
        if (totalReservations !== book_ids.length) {
          throw new Error("This reservation was already made!");
        }
    
        await StudentBooksModel.update({
            return_date: moment().add(10, 'days').format("YYYY-MM-DD"),
        }, {
            where: {
                student_id,
                book_id: book_ids,
            }
        });
    
        return true;
    }
};