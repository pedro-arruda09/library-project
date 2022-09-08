const express = require('express');
const pdfController = require('../controllers/pdfController');
const loginRequired = require('../middlewares/loginRequired');

const routes = express.Router();

routes.use(loginRequired);

routes.get('/pdf/:student_id', pdfController.index);

module.exports = routes;