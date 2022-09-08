const xlsx = require('xlsx');
const StudentBooksModel = require('../models/StudentBooksModel');
const StudentModel = require('../models/StudentModel');
const BookModel = require('../models/BookModel');
const UserModel = require('../models/UserModel');
const path = require('path');

const exportStudentBooksToExcel = (librarian, user, workSheetColumnNames, workSheetName, filePath) => {
    console.log(librarian.name);
    const data = user.map(user => {
        return [librarian.name, user.student.name, user.book.name, user.book.synopsis];
    });
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ...data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));

    return true;
};

const generateXLS = async (filter) => {
    const studentBooks = await StudentBooksModel.findAll({
        student_id: filter.student_id,
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
        where: {
            ...filter.userId
        },
        raw: true,
    })

    const workSheetColumnNames = ['Librarian', 'Student', 'Books', 'Synopsis'];
    const workSheetName = '';
    const filePath = './uploads/student_books.xlsx';

    const response = exportStudentBooksToExcel(librarian, studentBooks, workSheetColumnNames, workSheetName, filePath);
};

module.exports = {
    generateXLS
};