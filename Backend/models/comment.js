//Création d'un schéma de données
module.exports = (sequelize, Data) =>{
  const Comment = sequelize.define("comment", {
    _id: {TYPE: Data.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true},
    comment: { TYPE: Data.STRING, allowNull: false },
    author: {TYPE: Data.STRING, allowNull: false}
  });
  return Comment;
}