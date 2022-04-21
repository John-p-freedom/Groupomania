const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.users;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID invalide';
    } else {
      User.findOne({where: {id: userId}})
      .then(user => {
        req.auth = { user }
        next();
      })
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non authentifié')
    });
  }
};