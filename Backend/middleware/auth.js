//Import
const jwt = require('jsonwebtoken');
require('dotenv').config()

//Auth
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };  
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID invalide';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non authentifié')
    });
  }
};