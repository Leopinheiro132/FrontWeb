const DataTypes = require('sequelize');
const sequelize = require('../database')

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    desconto: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        unique: true,
    }

}, { timestamps: false });

module.exports = Produto;