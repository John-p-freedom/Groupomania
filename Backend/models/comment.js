//Création d'un schéma de données
module.exports = (sequelize, Sequelize) =>{
  const Comment = sequelize.define("comment", {
    _id: {TYPE: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true},
    comment: { TYPE: Sequelize.STRING, allowNull: false }
  });
  return Comment;
}