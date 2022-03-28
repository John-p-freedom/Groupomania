//Import
const express = require('express');
const helmet = require('helmet');
const db = require("./models");
require('dotenv').config()

//Routes
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentRoutes = require('/routes/comment');
const likeRoutes = require('./routes/like');

//Écoute
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Middlewares
app.use(express.json());
app.use(helmet({crossOriginResourcePolicy: false,}));
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);

//Export
module.exports = app;