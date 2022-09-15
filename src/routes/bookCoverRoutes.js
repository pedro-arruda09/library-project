const express = require('express');
const BookCoverController = require('../controllers/BookCoverController');
const loginRequired = require('../middlewares/loginRequired');
const Validate = require('../middlewares/validateSchema');
const BookCoverSchema = require('../schemas/BookCoverSchema');

const routes = express.Router();

routes.use(loginRequired);

routes.get('/book_covers/', BookCoverController.index);
routes.post('/book_cover/', BookCoverController.store);
routes.delete('/book_cover/:id', BookCoverController.delete);

module.exports = routes;