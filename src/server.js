const express = require('express');
const authRoutes = require('./routes/authRoutes');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const publisherRoutes = require('./routes/publisherRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');

const routes = [authRoutes, authorRoutes, bookRoutes, publisherRoutes, userRoutes, studentRoutes];

require('./database');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3003);