//Création d'un schéma de données
module.exports = (sequelize, Data) =>{
  const Message = sequelize.define("message", {
    id: {type: Data.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true},
    message: { type: Data.STRING, allowNull: false },
    author: {type: Data.STRING, allowNull: false}
  });
  return Message;
}