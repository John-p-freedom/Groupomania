//Importation de mongoose
const mongoose = require('mongoose');

//Création d'un schéma de données
const messageSchema = mongoose.Schema({
  message: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  usersDisliked: { type: [String], default: [] },
});

//Exportation du schéma de données
module.exports = mongoose.model('Message', messageSchema);