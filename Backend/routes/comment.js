//Import
const router = require("express").Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Routes
router.post("/new", auth, multer, commentCtrl.createComment);
router.get("/all", commentCtrl.getAllComment);
router.get("/:id", commentCtrl.getOneComment);
router.put("/:id", auth, multer, commentCtrl.updateComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

//Export
module.exports = router;