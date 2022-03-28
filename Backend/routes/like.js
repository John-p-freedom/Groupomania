//Imports
const router = require('express').Router();
const likeCtrl = require("../controllers/like");

//Routes
router.post("/", likeCtrl.like);
router.post("/liked", likeCtrl.liked);

//Export
module.exports = router;