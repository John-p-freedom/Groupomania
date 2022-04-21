const Message = require('../models/message');
const db = require("../models/index");
const fs = require('fs');

exports.getAllMessage = (req, res, next) => {
  db.messages.findAll()
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(400).json({ error }));
}

exports.getOneMessage = (req, res, next) => {
  db.messages.findOne({_id: req.params.id})
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
}

exports.createMessage = (userId, message) => {
  return Message.create({
    author: message.author,
    message: message.message,
    userId: userId,
  })
  .then((message) => res.status(201).json({ message }))
  .catch(error => res.status(400).json({ error }));
};

exports.modifyMessage = (req, res, next) => {
  db.messages.findOne({where:{ _id: req.params.id }})
    .then((message) => {
      if (message.userId !== req.auth.userId) {
        res.status(403).json({ error: "Requête non autorisée" });
      }
      const messageObject = req.file ?
          {
            ...JSON.parse(req.body.message),
          } : { ...req.body };
      db.messages.updateOne({where:{ _id: req.params.id }}, { ...messageObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Message modifiée." }))
        .catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {
  db.messages.findOne({where:{ _id: req.params.id }})
    .then((message) => {
      if (message.userId !== req.auth.userId) {
        return res.status(403).json({ error: "Requête non autorisé" });
      }
      db.messages.deleteOne({where:{ _id: req.params.id }})
      .then(() => res.status(200).json({ message: "Message supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};