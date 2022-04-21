const Comment = require('../models/comment');
const db = require("../models/index");
const fs = require('fs');

exports.getAllComment = (req, res, next) => {
  db.comments.find()
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(400).json({ error }));
}

//Read One
exports.getOneComment = (req, res, next) => {
  db.comments.findOne({where:{ _id: req.params.id }})
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
  db.comments.save()
    .then(() => res.status(201).json({ comment: 'Comment enregistré !'}))
    .catch((error) => res.status(400).json({ error }));
};

//Update
exports.modifyComment = (req, res, next) => {
  db.comments.findOne({where:{ _id: req.params.id }})
    .then((comment) => {
      if (comment.userId !== req.auth.userId) {
        res.status(403).json({ error: "Requête non autorisée" });
      }
      const commentObject = req.file ?
          {
            ...JSON.parse(req.body.comment),
          } : { ...req.body };
      db.comments.updateOne({where:{ _id: req.params.id }}, { ...commentObject, _id: req.params.id })
        .then(() => res.status(200).json({ comment: "Comment modifiée." }))
        .catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(400).json({ error }));
};

//Delete
exports.deleteComment = (req, res, next) => {
  db.comments.findOne({where:{ _id: req.params.id }})
    .then((comment) => {
      if (comment.userId !== req.auth.userId) {
        res.status(403).json({ error: "Requête non autorisé" });
      }
      db.comments.deleteOne({where:{ _id: req.params.id }})
      .then(() => res.status(200).json({ comment: "Comment supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};