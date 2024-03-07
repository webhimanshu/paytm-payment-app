require('dotenv').config();
const express = require('express');
const app = express();
const connectToDb = require('./db');
connectToDb();

//One way to connect to with db
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on('error', (error) => {
//             console.error("ERROR:", error);
//             throw error;
//         })
//         app.listen(process.env.PORT, function () {
//             console.log('App is running on port', process.env.PORT)
//         })
//     } catch (error) {
//         console.error("ERROR:", error);
//         throw error;
//     }