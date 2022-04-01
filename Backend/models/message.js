//Création d'un schéma de données
module.exports = (sequelize, Data) =>{
  const Message = sequelize.define("message", {
    message: { type: Data.STRING, allowNull: false },
    author: {type: Data.STRING, allowNull: false}
  });
  return Message;
}