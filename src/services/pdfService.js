const pdf = require('html-pdf');
const fs = require('fs');
const BookModel = require('../models/BookModel');
const StudentModel = require('../models/StudentModel');
const StudentBooksModel = require('../models/StudentBooksModel');
const UserModel = require('../models/UserModel');

const generatePDF = (pdfTemplate, filePath) => {
    console.log(pdfTemplate);
    return new Promise((resolve, reject) => {
        pdf.create(pdfTemplate, {}).toFile(filePath, (err, result) => {
            if (err) {
                reject('Deu erro');
                return;
            }

            resolve(result.filename)
        });
    })
}

const index = async (req, res) => {
    const studentBooks = await StudentBooksModel.findAll({
        include: [{
            model: StudentModel,
            attributes: ['name'],
            as: 'student',
        }, {
            model: BookModel,
            attributes: ['name', 'synopsis', 'publish_date'],
            as: 'book'
        }],
        raw: true,
        nest: true,
        attributes: [],
    })

    const librarian = await UserModel.findOne({
        attributes: ['name'],
        raw: true,
    })

    const parsedStudentBooks = studentBooks.map(studentBook => {
        return {
            student: {
                id: studentBook.student_id,
                name: studentBook.student.name,
            },
            book: {
                ...studentBook.book
            }
        }
    }).reduce((structure, currentStudent) => {
        if (!structure.student_id && !structure.student_name) {
            return {
                student_id: currentStudent.student.id,
                student_name: currentStudent.student.name,
                books: [currentStudent.book]
            }
        }

        structure.books.push(currentStudent.book);

        return structure;
    }, {});

    const booksHTML = parsedStudentBooks.books.reduce((html, currentBook) => {

        html += `
                    <tr>
                        <td>${parsedStudentBooks.student_name}</td>
                        <td>${currentBook.name}</td>
                        <td>${currentBook.synopsis}</td>
                        <td>${currentBook.publish_date}</td>
                    </tr>
                        `

        return html;
    }, '');

    let pdfTemplate = fs.readFileSync('html/header.html', 'UTF-8');

    pdfTemplate = pdfTemplate.replace('{{ booksHTML }}', booksHTML);
    pdfTemplate = pdfTemplate.replace('{{ librarian }}', librarian.name);

    const filePath = `./uploads/booksPDF.pdf`;

    const pdfCreated = await generatePDF(pdfTemplate, filePath);

    res.type('pdf');
    res.download(pdfCreated);

}

module.exports = {
    index,
    generatePDF
};