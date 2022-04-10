//Imports
const router = require('express').Router();
const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth");

//Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get("/:id", userCtrl.getOneUser);
router.put('/:id', auth, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);  

//Export
module.exports = router;