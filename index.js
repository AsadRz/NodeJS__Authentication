const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Import Routes
const authRoute = require("./routes/auth");

//Environment Variables
dotenv.config();

//Connect Database
mongoose.connect(process.env.DB_Connect, { useNewUrlParser: true }, () =>
  console.log("Connected to DB")
);

//Middlewares
app.use(express.json());

//Route Middlewares
app.use("/api/users", authRoute);

app.listen(3000, () => console.log("Server Listening on Port 3000"));
