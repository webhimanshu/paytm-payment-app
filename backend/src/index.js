require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const DB_NAME = require('./constants');
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error', (error) => {
            console.error("ERROR:", error);
            throw error;
        })
        app.listen(process.env.PORT, function () {
            console.log('App is running on port', process.env.PORT)
        })
    } catch (error) {
        console.error("ERROR:", error);
        throw error;
    }
})();