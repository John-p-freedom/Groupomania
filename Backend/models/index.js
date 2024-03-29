const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.messages = require("./message.js")(sequelize, Sequelize);
db.comments = require("./comment.js")(sequelize, Sequelize);

db.users.hasMany(db.messages, { as: "messages" });
db.messages.belongsTo(db.users, {foreignKey: "userId",as: "users",});

db.users.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.users, {foreignKey: "userId",as: "users",});

db.messages.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.messages, {foreignKey: "messageId",as: "messages",});


//Export
module.exports = db;