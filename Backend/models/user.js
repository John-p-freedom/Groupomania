//Schéma
module.exports = (sequelize, Data) =>{
  const User = sequelize.define('user',{
    email: { type: Data.STRING, allowNull: false, unique: true },
    password: { type: Data.STRING, allowNull: false },
    admin: { type: Data.BOOLEAN, default: false }
  });
  return User;
}