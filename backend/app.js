const express = require('express');
const goalRouter = require('./routes/goalRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRouter);

//This will override the default express error handler.
app.use(errorHandler);

module.exports = app;
