const express = require('express');
const authRoutes = require('./routes/authRoutes');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const publisherRoutes = require('./routes/publisherRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const xlsRoutes = require('./routes/xlsRoutes');
const bookCoverRoutes = require('./routes/bookCoverRoutes');

const routes = [authRoutes, authorRoutes, bookRoutes, publisherRoutes, userRoutes, studentRoutes, pdfRoutes, xlsRoutes, bookCoverRoutes];

require('./database');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3003);