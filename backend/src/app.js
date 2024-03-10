const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mainRouter = require('./routes/index');
const userRouter = require('./routes/user');
const accountRouter = require('./routes/account');
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));// when we pass data in url it convert special char(space etc) into some charcter 
app.use(express.static('public'));// sometime we want to store pdf and images on our server
app.use(cookieParser());

app.use('/api/v1', mainRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/account', accountRouter);

module.exports = app;