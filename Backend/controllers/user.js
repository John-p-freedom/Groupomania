const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require("../models");
const User = db.users;

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
        admin: false
      })
      .then((User) => res.status(201).json({ token: jwt.sign({ userId: User.id },process.env.TOKEN,{ expiresIn: '24h' })}))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({where:{ email: req.body.email }})
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur introuvable' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect' });
            }
            res.status(200).json({
              token: jwt.sign(
                { userId: user.id },
                process.env.TOKEN,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.getStorage = (req, res, next) => {
  res.status(200).json(req.auth);
}

exports.modifyUser = (req, res, next) => {
    const userObject = req.file ?
    {...JSON.parse(req.body.user)} : { ...req.body };
    User.update(...userObject, {where:{ id: req.params.id }})
    .then(() => res.status(200).json({ message: "Utilisateur modifié" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  User.destroy({where:{ id: req.params.id }})
  .then(() => res.status(200).json({ message: "Utilisateur supprimée" }))
  .catch((error) => res.status(400).json({ error }));
};