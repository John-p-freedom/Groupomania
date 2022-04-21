module.exports = (sequelize, Data) =>{
  const Message = sequelize.define("message", {
    message: { type: Data.STRING, allowNull: false, required: true },
    author: {type: Data.STRING, allowNull: false, required: true},
    userId: {type: Data.INTEGER, allowNull: false, required: true}
  });
  return Message;
}