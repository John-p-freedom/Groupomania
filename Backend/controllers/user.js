//Imports
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require("fs");
const db = require("../models");
const User = db.users;

//Signup
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        User.create({
          email: req.body.email,
          password: hash,
          admin: false
        })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

//Login
exports.login = (req, res, next) => {
    db.users.findOne({ email: req.body.email })
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
              userId: user.id,
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

//Update
exports.modifyUser = (req, res, next) => {
  db.users.findOne({ id: req.params.id })
    .then((user) => {
      if (user !== req.auth.userId) {
        res.status(403).json({ error: "Utilisateur non authentifié" });
      }
      const userObject = req.file ?
          {...JSON.parse(req.body.user)} : { ...req.body };
      db.users.updateOne({ id: req.params.id }, { ...userObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Utilisateur modifié" }))
        .catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(400).json({ error }));
};

//Delete
exports.deleteUser = (req, res, next) => {
  db.users.findOne({ id: req.params.id })
    .then((user) => {
      if (req.auth.admin == true || user == req.auth.userId){
        db.users.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: "Utilisateur supprimée" }))
        .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(403).json({ error: "Utilisateur non authentifié" });
      }})
    .catch((error) => res.status(500).json({ error }));
};