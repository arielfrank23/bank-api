const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    // Utilisation de 'name' pour correspondre à tes tests
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false 
    },
    solde: { 
        type: DataTypes.FLOAT, 
        defaultValue: 0 
    }
});

module.exports = User;