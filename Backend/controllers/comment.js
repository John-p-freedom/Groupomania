const db = require("../models");
const Comment = db.comments;

exports.createComment = (req, res, next) => {
  Comment.create({
    author: req.body.author,
    comment: req.body.comment,
    userId: req.body.userId,
    messageId: req.body.messageId,
  })
  .then((comment) => res.status(201).json({comment}))
  .catch((error) => res.status(400).json({ error }));
};

exports.getAllComment = (req, res, next) => {
  Comment.findAll({order: [['updatedAt', "DESC"], ['createdAt', "DESC"]]})
  .then((comment) => res.status(201).json({comment}))
  .catch((error) => res.status(400).json({ error }));
}