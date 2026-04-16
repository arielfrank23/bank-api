const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', { // Vérifie si c'est 'User' ou 'Users' selon ta BD
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    solde: { type: DataTypes.FLOAT, defaultValue: 0 }
}, {
    tableName: 'Users' // Force Sequelize à regarder la table "Users" que tu as remplie
});

module.exports = User;