//Création d'un schéma de données
module.exports = (sequelize, Data) =>{
  const Comment = sequelize.define("comment", {
    id: {type: Data.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true},
    comment: { type: Data.STRING, allowNull: false },
    author: {type: Data.STRING, allowNull: false}
  });
  return Comment;
}