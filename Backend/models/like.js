module.exports = (sequelize, Data) =>{
    const Like = sequelize.define("like", {
      like: {type: Data.INTEGER, default: 0},
      author: {type: Data.STRING, allowNull: false}
    });
    return Like;
}