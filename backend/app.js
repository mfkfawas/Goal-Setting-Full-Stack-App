const express = require('express');
const goalRouter = require('./routes/goalRoutes');
const userRouter = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRouter);
app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        '../',
        'frontend',
        'build',
        'index.html'
      )
    );
  });
} else {
  app.get('/', (req, res) => res.send('Please set to production.'));
}

//This will override the default express error handler.
app.use(errorHandler);

module.exports = app;
