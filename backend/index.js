require('dotenv').config();
const express = require('express');
const mainRouter = require('./routes/mainRoute');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

connectDB()
    .then(() => {
        app.listen(3000);
        console.log("Connect to Databse");
        app.use("/api/v1", mainRouter);   // /api/v2/user/signup
    })
    .catch((err) => {
        console.log(err);
    })