const router = require("express").Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/new", auth, commentCtrl.createComment);
router.get("/all", commentCtrl.getAllComment);
//router.get("/:id", commentCtrl.getOneComment);
//router.put("/:id", auth, commentCtrl.modifyComment);
//router.delete("/:id", auth, commentCtrl.deleteComment);
    
module.exports = router;