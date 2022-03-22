//Import
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const db = require("./models");
require('dotenv').config()

//Routes
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const remarkRoutes = require('/routes/remark');

//Écoute
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Middlewares
db.sequelize.sync();
app.use(express.json());
app.use(helmet({crossOriginResourcePolicy: false,}));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/remark', remarkRoutes)

//Export
module.exports = app;