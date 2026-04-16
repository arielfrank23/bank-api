const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://neondb_owner:ariel5636@ep-steep-lake-anqgv9on-pooler.c-6.us-east-1.aws.neon.tech/neondb?uselibpqcompat=true&sslmode=require', {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
        connectTimeout: 60000 // Augmente le temps d'attente à 60 secondes
    }
});

module.exports = sequelize;