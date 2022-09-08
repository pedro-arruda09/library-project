const express = require('express');
const AuthorController = require('../controllers/AuthorController');
const loginRequired = require('../middlewares/loginRequired');
const Validate = require('../middlewares/validateSchema');
const AuthorSchema = require('../schemas/AuthorSchema');

const routes = express.Router();

routes.use(loginRequired);

routes.get('/authors/', AuthorController.index);
routes.get('/author/:id', Validate(AuthorSchema.show), AuthorController.show);
routes.post('/authors/', Validate(AuthorSchema.store), AuthorController.store);
routes.put('/author/:id', Validate(AuthorSchema.update), AuthorController.update);
routes.delete('/author/:id', Validate(AuthorSchema.delete), AuthorController.delete);

module.exports = routes;