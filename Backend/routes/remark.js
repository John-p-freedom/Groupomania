//Import
const router = require("express").Router();
const remarkCtrl = require("../controllers/remark");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Routes
router.post("/new", auth, multer, remarkCtrl.createMessage);
router.get("/all", remarkCtrl.getAllMessages);
router.get("/:id", remarkCtrl.getOneMessage);
router.put("/:id", auth, multer, remarkCtrl.updateMessage);
router.delete("/:id", auth, remarkCtrl.deleteMessage);

//Export
module.exports = router;