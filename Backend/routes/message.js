const router = require("express").Router();
const messageCtrl = require("../controllers/message");
const auth = require("../middleware/auth");

router.post("/new", auth, messageCtrl.createMessage);
router.get("/all", auth, messageCtrl.getAllMessage);
router.put("/:id", auth, messageCtrl.modifyMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);
    
module.exports = router;