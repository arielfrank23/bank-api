const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    nom: { type: DataTypes.STRING, allowNull: false }, // Reviens à 'nom'
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    solde: { type: DataTypes.FLOAT, defaultValue: 0 }
}, {
    tableName: 'Users' 
});

module.exports = User;