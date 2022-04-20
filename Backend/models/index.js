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

//Routes models
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.js")(sequelize, Sequelize);
db.messages = require("./message.js")(sequelize, Sequelize);
db.comments = require("./comment.js")(sequelize, Sequelize);
db.likes = require("./like.js")(sequelize, Sequelize);

//One to many
db.users.hasMany(db.messages, { as: "messages" });
db.messages.belongsTo(db.users, {foreignKey: "usersId",as: "users",});
//db.users.hasMany(db.comments, { as: "comments" });
//db.comments.belongsTo(db.users, {foreignKey: "usersId",as: "users",});
//db.users.hasMany(db.likes, { as: "likes" });
//db.likes.belongsTo(db.users, {foreignKey: "usersId",as: "users",});
//db.users.hasMany(db.dislikes, { as: "dislikes" });
//db.dislikes.belongsTo(db.users, {foreignKey: "usersId",as: "users",});
//db.messages.hasMany(db.comments, { as: "comments" });
//db.comments.belongsTo(db.messages, {foreignKey: "messagesId",as: "messages",});
//db.messages.hasMany(db.likes, { as: "likes" });
//db.likes.belongsTo(db.messages, {foreignKey: "messagesId",as: "messages",});
//db.messages.hasMany(db.dislikes, { as: "dislikes" });
//db.dislikes.belongsTo(db.messages, {foreignKey: "messagesId",as: "messages",});

//Export
module.exports = db;