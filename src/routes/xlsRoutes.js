const express = require('express');
const xlsController = require('../controllers/xlsController');
const loginRequired = require('../middlewares/loginRequired');

const routes = express.Router();

routes.use(loginRequired);

routes.get('/xls/:student_id', xlsController.index);

module.exports = routes;