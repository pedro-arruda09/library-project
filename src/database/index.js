const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/UserModel');
const Publisher = require('../models/PublisherModel');
const Student = require('../models/StudentModel');
const Author = require('../models/AuthorModel');
const Book = require('../models/BookModel');

const Models = [User, Publisher, Student, Author, Book];

const connection = new Sequelize(dbConfig);

Models.forEach(model => model.init(connection));
Models.forEach(model => model.associate && model.associate(connection.models));

module.exports = connection;