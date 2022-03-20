//Import
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user');
require('dotenv').config()
const app = express();

//Écoute
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Middlewares
app.use(express.json());
app.use(helmet({crossOriginResourcePolicy: false,}));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);

//Export
module.exports = app;