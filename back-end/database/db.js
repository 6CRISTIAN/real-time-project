const { Sequelize } = require('sequelize')
const { db } = require('../config')

module.exports = sequelize = new Sequelize(
    db.database,
    db.username,
    db.password, {
    host: db.host,
    dialect: 'postgres'
}
)