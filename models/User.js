const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    solde: { type: DataTypes.FLOAT, defaultValue: 0 }
}, {
    tableName: 'Users' // <--- Ajoute cette ligne si elle n'y est pas
});

module.exports = User;