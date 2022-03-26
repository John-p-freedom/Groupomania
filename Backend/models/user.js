//Imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Schéma
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  age: { type: Number, required: true },
  poste: { type: String, required: true },
  city: { type: String, required: true },
  bio: { type: String }
});

//Validateur
userSchema.plugin(uniqueValidator);

//Export
module.exports = mongoose.model('User', userSchema);