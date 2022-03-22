//Import
const router = require("express").Router();
const messageCtrl = require("../controllers/message");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Routes
router.post("/new", auth, multer, messageCtrl.createMessage);
router.get("/all", messageCtrl.getAllMessages);
router.get("/:id", messageCtrl.getOneMessage);
router.put("/:id", auth, multer, messageCtrl.updateMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);

//Export
module.exports = router;