const Sequelize = require('sequelize')
const sequelize = require('../util/sql_database')

const User = sequelize.define('User',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type:Sequelize.STRING
    }
})

module.exports = User