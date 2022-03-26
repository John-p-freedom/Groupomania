//Importation de mongoose
const mongoose = require('mongoose');

//Création d'un schéma de données
const messageSchema = mongoose.Schema({
  message: { type: String, required: true },
});

//Exportation du schéma de données
module.exports = mongoose.model('Message', messageSchema);