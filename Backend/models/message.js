//Création d'un schéma de données
module.exports = (sequelize, Sequelize) =>{
  const Message = sequelize.define("message", {
    _id: {TYPE: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true},
    message: { TYPE: Sequelize.STRING, allowNull: false }
  });
  return Message;
}