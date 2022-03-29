module.exports = (sequelize, Data) =>{
    const Like = sequelize.define("like", {
      id: {type: Data.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, unique: true},
      like: { type: Data.NUMBER, default: 0 },
      author: {type: Data.STRING, allowNull: false}
    });
    return Like;
}