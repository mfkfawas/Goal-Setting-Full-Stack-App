const dotenv = require('dotenv').config();
const path = require('path');
const colors = require('colors');
const mongoose = require('mongoose');
const app = require('./app');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `mongoDB connected: ${connect.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();

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

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server running on ${port}`)
);
