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
};

const index = async () => {
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
    });

    const librarian = await UserModel.findOne({
        attributes: ['name'],
        raw: true,
    })

    const booksHTML = studentBooks.reduce((html, currentBook) => {

        html += `
                    <tr>
                        <td>${currentBook.student.name}</td>
                        <td>${currentBook.book.name}</td>
                        <td>${currentBook.book.synopsis}</td>
                        <td>${currentBook.book.publish_date}</td>
                    </tr>
                        `

        return html;
    }, '');

    let pdfTemplate = fs.readFileSync('html/header.html', 'UTF-8');

    pdfTemplate = pdfTemplate.replace('{{ booksHTML }}', booksHTML);
    pdfTemplate = pdfTemplate.replace('{{ librarian }}', librarian.name);

    const filePath = `./uploads/booksPDF.pdf`;

    return generatePDF(pdfTemplate, filePath);
}

module.exports = {
    index,
    generatePDF
};