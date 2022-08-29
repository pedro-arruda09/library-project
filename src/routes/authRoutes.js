const express = require('express');
const AuthController = require('../controllers/AuthController')

const routes = express.Router();

routes.post('/auth/login', AuthController.store);

module.exports = routes;