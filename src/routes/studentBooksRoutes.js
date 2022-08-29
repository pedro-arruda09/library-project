const express = require('express');
const PublisherController = require('../controllers/PublisherController');
const loginRequired = require('../middlewares/loginRequired');
const Validate = require('../middlewares/validateSchema');
const PublisherSchema = require('../schemas/PublisherSchema');

const routes = express.Router();

routes.use(loginRequired);

routes.get('/publishers/', PublisherController.index);
routes.get('/publisher/:id', Validate(PublisherSchema.show), PublisherController.show);
routes.post('/publishers/', Validate(PublisherSchema.store), PublisherController.store);
routes.put('/publisher/:id', Validate(PublisherSchema.update), PublisherController.update);
routes.delete('/publisher/:id', Validate(PublisherSchema.delete), PublisherController.delete);

module.exports = routes;