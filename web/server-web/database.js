const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ' database.db'
})
sequelize.sync();

module.exports = sequelize;