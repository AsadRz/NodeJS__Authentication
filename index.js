const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const restRouter = require('./src/api');
//Import Routes
// const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");

//Environment Variables
dotenv.config();

mongoose.Promise = global.Promise;
//Connect Database

const connectDB = async () => {
  mongoose.connect(
    process.env.DB_Connect,
    { useNewUrlParser: true, useCreateIndex: true },
    () => console.log('Connected to DB')
  );
};

connectDB();

//Middlewares used as bodyParser
app.use(express.json());

//Route Middlewares
app.use('/api', restRouter);

app.listen(3000, () => console.log('Server Listening on Port 3000'));
