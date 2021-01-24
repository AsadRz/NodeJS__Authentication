const dotenv = require('dotenv');
const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connect(
    process.env.DB_Connect,
    { useNewUrlParser: true, useCreateIndex: true },
    () => console.log('Connected to DB')
  );
};

module.exports = connectDB;
