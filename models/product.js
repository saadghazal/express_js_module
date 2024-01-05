

const Sequelize = require('sequelize')
const sequelize = require('../util/sql_database')


/**
 * Defines the Product model using Sequelize.
 *
 * The model has the following fields:
 * - id: Auto-incrementing integer primary key
 * - title: String
 * - price: Double, required
 * - imageUrl: String, required
 * - description: String, required
 */
const Product = sequelize.define("Product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Product