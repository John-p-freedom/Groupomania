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
db.users = require("./user.js")(sequelize, Sequelize);
db.messages = require("./message.js")(sequelize, Sequelize);
db.comments = require("./comment.js")(sequelize, Sequelize);

//Export
module.exports = db;