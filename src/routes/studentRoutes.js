const express = require('express');
const StudentController = require('../controllers/StudentController');
const loginRequired = require('../middlewares/loginRequired');
const Validate = require('../middlewares/validateSchema');
const StudentSchema = require('../schemas/StudentSchema');

const routes = express.Router();

routes.use(loginRequired)

routes.get('/students/', StudentController.index);
routes.get('/student/:id', Validate(StudentSchema.show), StudentController.show);
routes.post('/students/', Validate(StudentSchema.store), StudentController.store);
routes.put('/student/:id', Validate(StudentSchema.update), StudentController.update);
routes.delete('/student/:id', Validate(StudentSchema.delete), StudentController.delete);

module.exports = routes;