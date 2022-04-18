//Schéma
module.exports = (sequelize, Data) =>{
  const User = sequelize.define('user',{
    pseudo: { type: Data.STRING, allowNull: false},
    email: { type: Data.STRING, allowNull: false, unique: true },
    password: { type: Data.STRING, allowNull: false },
    admin: { type: Data.BOOLEAN, default: false }
  });
  return User;
}