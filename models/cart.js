const Sequelize = require("sequelize");
const sequelize = require("../util/sql_database");
const Cart = sequelize.define("Cart", {
  id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  }
})

module.exports = Cart;