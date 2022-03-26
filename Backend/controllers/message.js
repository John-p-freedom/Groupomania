//Import
const Message = require('../models/message');
const db = require("../models/index");
const fs = require('fs');

//Read All
exports.getAllMessage = (req, res, next) => {
  db.find()
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(400).json({ error }));
}

//Read One
exports.getOneMessage = (req, res, next) => {
  db.findOne({ _id: req.params.id })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
}

//Create
exports.createMessage = (req, res, next) => {
  const messageObject = JSON.parse(req.body.message);
  delete messageObject._id;
  const message = new Message({
    ...messageObject
  });
  db.save()
    .then(() => res.status(201).json({ message: 'Message enregistré !'}))
    .catch((error) => res.status(400).json({ error }));
};

//Update
exports.modifyMessage = (req, res, next) => {
  db.findOne({ _id: req.params.id })
    .then((message) => {
      if (message.userId !== req.auth.userId) {
        res.status(403).json({ error: "Requête non autorisée" });
      }
      const messageObject = req.file ?
          {
            ...JSON.parse(req.body.message),
          } : { ...req.body };
      db.updateOne({ _id: req.params.id }, { ...messageObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Message modifiée." }))
        .catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(400).json({ error }));
};

//Delete
exports.deleteMessage = (req, res, next) => {
  db.findOne({ _id: req.params.id })
    .then((message) => {
      if (message.userId !== req.auth.userId) {
        res.status(403).json({ error: "Requête non autorisé" });
      }
      db.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Message supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};