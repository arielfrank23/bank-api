const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
    telephone: { type: DataTypes.STRING, allowNull: true },
    adresse: { type: DataTypes.STRING, allowNull: true },
    solde: { type: DataTypes.FLOAT, defaultValue: 0 }
}, {
    tableName: 'Users',
    timestamps: true
});

module.exports = User;