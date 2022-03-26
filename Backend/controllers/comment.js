//Import
const Comment = require('../models/comment');
const db = require("../models/index");
const fs = require('fs');

//Read All
exports.getAllComment = (req, res, next) => {
  db.find()
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(400).json({ error }));
}

//Read One
exports.getOneComment = (req, res, next) => {
  db.findOne({ _id: req.params.id })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
}

//Create
exports.createComment = (req, res, next) => {
  const commentObject = JSON.parse(req.body.comment);
  delete commentObject._id;
  const comment = new Comment({
    ...commentObject
  });
  db.save()
    .then(() => res.status(201).json({ comment: 'Comment enregistré !'}))
    .catch((error) => res.status(400).json({ error }));
};

//Update
exports.modifyComment = (req, res, next) => {
  db.findOne({ _id: req.params.id })
    .then((comment) => {
      if (comment.userId !== req.auth.userId) {
        res.status(403).json({ error: "Requête non autorisée" });
      }
      const commentObject = req.file ?
          {
            ...JSON.parse(req.body.comment),
          } : { ...req.body };
      db.updateOne({ _id: req.params.id }, { ...commentObject, _id: req.params.id })
        .then(() => res.status(200).json({ comment: "Comment modifiée." }))
        .catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(400).json({ error }));
};

//Delete
exports.deleteComment = (req, res, next) => {
  db.findOne({ _id: req.params.id })
    .then((comment) => {
      if (comment.userId !== req.auth.userId) {
        res.status(403).json({ error: "Requête non autorisé" });
      }
      db.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ comment: "Comment supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};