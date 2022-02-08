const dotenv = require('dotenv').config();
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

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server running on ${port}`)
);
