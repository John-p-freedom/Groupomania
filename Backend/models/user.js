//Imports
const uniqueValidator = require('mongoose-unique-validator');

//Schéma
module.exports = (sequelize, Sequelize) =>{
  const User = sequelize.define('user',{
    _id: {TYPE: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true},
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    firstName: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.NUMBER, allowNull: false },
    poste: { type: Sequelize.STRING, allowNull: false },
    city: { type: Sequelize.STRING, allowNull: false },
    bio: { type: Sequelize.STRING, allowNull: false },
    admin: { type: Sequelize.BOOLEAN, default: false }
  });
  return User;
}

//Validateur
User.plugin(uniqueValidator);