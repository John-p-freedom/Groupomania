//Imports
const router = require('express').Router();
const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);  

//Export
module.exports = router;