const express = require('express');
const BookController = require('../controllers/BookController');
const loginRequired = require('../middlewares/loginRequired');
const Validate = require('../middlewares/validateSchema');
const BookSchema = require('../schemas/BookSchema');

const routes = express.Router();

routes.use(loginRequired);

routes.get('/books/', BookController.index);
routes.get('/book/:id', Validate(BookSchema.show), BookController.show);
routes.post('/books/', Validate(BookSchema.store), BookController.store);
routes.put('/book/:id', Validate(BookSchema.update), BookController.update);
routes.delete('/book/:id', Validate(BookSchema.delete), BookController.delete);
routes.post('/book/:id', BookController.sendToBookDb);

module.exports = routes;