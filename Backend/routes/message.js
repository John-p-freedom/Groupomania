//Import
const router = require("express").Router();
const messageCtrl = require("../controllers/message");
const auth = require("../middleware/auth");

//Routes
router.post("/new", auth, messageCtrl.createMessage);
router.get("/all", messageCtrl.getAllMessage);
router.get("/:id", messageCtrl.getOneMessage);
router.put("/:id", auth, messageCtrl.modifyMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);
    
//Export
module.exports = router;