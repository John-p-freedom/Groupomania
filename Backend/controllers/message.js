//Import
const Message = require('../models/message');
const db = require("../models/index");
const fs = require('fs');

//Read All
exports.getAllMessage = (req, res, next) => {
  db.Message.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
}

//Read One
exports.getOneMessage = (req, res, next) => {
  db.Message.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
}

//Create
exports.createMessage = (req, res, next) => {
  const messageObject = JSON.parse(req.body.message);
  delete messageObject._id;
  const message = new Message({
    ...messageObject
  });
  db.message.save()
    .then(() => res.status(201).json({ message: 'Message enregistré !'}))
    .catch((error) => res.status(400).json({ error }));
};

//Update
exports.modifyMessage = (req, res, next) => {
  db.Message.findOne({ _id: req.params.id })
    .then((message) => {
      if (message.userId !== req.auth.userId) {
        res.status(403).json({ error: "Requête non autorisée" });
      }
      const messageObject = req.file ?
          {
            ...JSON.parse(req.body.message),
          } : { ...req.body };
      db.Message.updateOne({ _id: req.params.id }, { ...messageObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Message modifiée." }))
        .catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(400).json({ error }));
};

//Delete
exports.deleteMessage = (req, res, next) => {
  db.Message.findOne({ _id: req.params.id })
    .then((message) => {
      if (message.userId !== req.auth.userId) {
        res.status(403).json({ error: "Requête non autorisé" });
      }
      db.Message.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Message supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//(dis)Likes
exports.likeOrDislike = (req, res, next) => {
  if (req.body.like === 1) {
    db.Message.updateOne({ _id: req.params.id },
      {
        $inc: { likes: req.body.like++ },
        $push: { usersLiked: req.body.userId },
      })
      .then((message) => res.status(200).json({ message: "Ajout Like" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (req.body.like === -1) {
    db.Message.updateOne({ _id: req.params.id },
      {
        $inc: { dislikes: req.body.like++ * -1 },
        $push: { usersDisliked: req.body.userId },
      })
      .then((message) => res.status(200).json({ message: "Ajout Dislike" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    db.Message.findOne({ _id: req.params.id })
      .then((message) => {
        if (message.usersLiked.includes(req.body.userId)) {
          db.Message.updateOne({ _id: req.params.id },
            { 
              $pull: { usersLiked: req.body.userId },
              $inc: { likes: -1 } 
            })
            .then((message) => {res.status(200).json({ message: "Suppression Like" });})
            .catch((error) => res.status(400).json({ error }));
        } else if (message.usersDisliked.includes(req.body.userId)) {
          db.Message.updateOne({ _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            })
            .then((message) => {res.status(200).json({ message: "Suppression Dislike" });})
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};