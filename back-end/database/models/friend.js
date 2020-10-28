const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Friend extends Model { }
Friend.init({
    name: { type: DataTypes.CHAR(60), allowNull: false },
    gender: { type: DataTypes.CHAR(1), allowNull: false }
}, {
    sequelize,
    modelName: 'my_friends'
})

module.exports = Friend