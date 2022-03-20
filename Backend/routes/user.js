//Imports
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const userCtrl = require('../controllers/user');

//Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);

//Export
module.exports = router;