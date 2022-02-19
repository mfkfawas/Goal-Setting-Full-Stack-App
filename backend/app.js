const express = require('express');
const goalRouter = require('./routes/goalRoutes');
const userRouter = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRouter);
app.use('/api/users', userRouter);

//This will override the default express error handler.
app.use(errorHandler);

module.exports = app;
