//Création d'un schéma de données
module.exports = (sequelize, Data) =>{
  const Comment = sequelize.define("comment", {
    comment: { type: Data.STRING, allowNull: false },
    author: {type: Data.STRING, allowNull: false}
  });
  return Comment;
}