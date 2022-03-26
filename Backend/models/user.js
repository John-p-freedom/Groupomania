//Imports
const uniqueValidator = require('mongoose-unique-validator');

//Schéma
module.exports = (sequelize, Data) =>{
  const User = sequelize.define('user',{
    _id: {TYPE: Data.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true},
    email: { type: Data.STRING, allowNull: false, unique: true },
    password: { type: Data.STRING, allowNull: false },
    lastName: { type: Data.STRING, allowNull: false },
    firstName: { type: Data.STRING, allowNull: false },
    age: { type: Data.NUMBER, allowNull: false },
    poste: { type: Data.STRING, allowNull: false },
    city: { type: Data.STRING, allowNull: false },
    bio: { type: Data.STRING, allowNull: false },
    admin: { type: Data.BOOLEAN, default: false }
  });
  return User;
}

//Validateur
User.plugin(uniqueValidator);