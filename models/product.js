

const Sequelize = require('sequelize')
const sequelize = require('../util/sql_database')


const Product = sequelize.define('Product',{
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
        allowNull:false
    }
});
module.exports = Product