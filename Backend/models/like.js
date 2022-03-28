module.exports = (sequelize, Data) =>{
    const Like = sequelize.define("like", {
      _id: {TYPE: Data.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true},
      like: { TYPE: Data.NUMBER, default: 0 },
      author: {TYPE: Data.STRING, allowNull: false}
    });
    return Like;
}