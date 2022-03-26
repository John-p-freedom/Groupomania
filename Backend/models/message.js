//Création d'un schéma de données
module.exports = (sequelize, Data) =>{
  const Message = sequelize.define("message", {
    _id: {TYPE: Data.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true},
    message: { TYPE: Data.STRING, allowNull: false }
  });
  return Message;
}