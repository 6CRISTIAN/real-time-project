const { Sequelize } = require('sequelize')
const { database } = require('../config')

module.exports = sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
    host: database.host,
    dialect: 'postgres'
}
)