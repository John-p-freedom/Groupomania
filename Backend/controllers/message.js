const { comments } = require("../models");
const db = require("../models");
const Message = db.messages;

exports.createMessage = (req, res, next) => {
  Message.create({
    author: req.body.author,
    message: req.body.message,
    userId: req.body.userId,
  })
  .then((message) => res.status(201).json({ message }))
  .catch((error) => res.status(400).json({ error }));
};

exports.getAllMessage = (req, res, next) => {
  Message.findAll({order: [['updatedAt', "DESC"], ['createdAt', "DESC"]], include: ["comments"]})
  .then((message) => res.status(201).json({ message }))
  .catch((error) => res.status(400).json({ error }));
}

exports.deleteMessage = (req, res, next) => {
  Message.findOne({where:{ id: req.params.id }})
    .then((message) => {
      console.log(message.userId);
      console.log(req.auth.user.id);
      console.log(message.userId != req.auth.user.id);
      if (message.userId != req.auth.user.id) {
        return res.status(403).json({ error: "Requête non autorisé" });
      }
      Message.destroy({where:{ id: req.params.id }})
      .then(() => res.status(200).json({ message: "Message supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneMessage = (req, res, next) => {
  Message.findOne({where:{_id: req.params.id}})
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
}

exports.modifyMessage = (req, res, next) => {
  Message.findOne({where:{ id: req.params.id }})
    .then((message) => {
      if (message.userId !== req.auth.user.id) {
        res.status(403).json({ error: "Requête non autorisée" });
      }
      Message.updateOne({where:{ id: req.params.id }}, { ...req.body, id: req.params.id })
        .then(() => res.status(200).json({ message: "Message modifiée." }))
        .catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(400).json({ error }));
};