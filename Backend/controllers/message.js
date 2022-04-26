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
  Message.findAll({order: [['updatedAt', "DESC"], ['createdAt', "DESC"]]})
  .then((message) => res.status(201).json({ message }))
  .catch((error) => res.status(400).json({ error }));
}

exports.deleteMessage = (req, res, next) => {
  Message.findOne({where:{ _id: req.params.id }})
    .then((message) => {
      if (message.userId !== req.auth.userId) {
        return res.status(403).json({ error: "Requête non autorisé" });
      }
      Message.destroy({where:{ _id: req.params.id }})
      .then(() => res.status(200).json({ message: "Message supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/*exports.getOneMessage = (req, res, next) => {
  Message.findOne({where:{_id: req.params.id}})
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
}*/

/*exports.modifyMessage = (req, res, next) => {
  Message.findOne({where:{ _id: req.params.id }})
    .then((message) => {
      if (message.userId !== req.auth.userId) {
        res.status(403).json({ error: "Requête non autorisée" });
      }
      const messageObject = req.file ?
          {
            ...JSON.parse(req.body.message),
          } : { ...req.body };
      Message.updateOne({where:{ _id: req.params.id }}, { ...messageObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Message modifiée." }))
        .catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(400).json({ error }));
};*/