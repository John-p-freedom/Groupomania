//Import
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

//New sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = require("../config/db.config")(sequelize, Sequelize);

//Export
module.exports = db;