//Importation de mongoose
const mongoose = require('mongoose');

//Création d'un schéma de données
const commentSchema = mongoose.Schema({
  comment: { type: String, required: true },
});

//Exportation du schéma de données
module.exports = mongoose.model('Comment', commentSchema);