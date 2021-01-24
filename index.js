const express = require('express');
const app = express();
const dotenv = require('dotenv');
const restRouter = require('./src/api');
const connectDB = require('./dbConnection');

/**
 * PORT configuration
 */

//Environment Variables
dotenv.config();
//Connect Database
const PORT = process.env.PORT || 3000;
connectDB();

//Middlewares used as bodyParser
app.use(express.json());

//Route Middlewares
app.use('/api', restRouter);

app.listen(PORT, () => console.log(`Server Listening on Port ${PORT}`));
