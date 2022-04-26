//Création d'un schéma de données
module.exports = (sequelize, Data) =>{
    const Comment = sequelize.define("comment", {
      comment: {type: Data.STRING, allowNull: false, required: true},
      author: {type: Data.STRING, allowNull: false, required: true},
      userId: {type: Data.INTEGER, allowNull: false, required: true},
      messageId: {type: Data.INTEGER, allowNull: false, required: true}
    });
    return Comment;
}