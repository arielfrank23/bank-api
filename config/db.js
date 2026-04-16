const { Sequelize } = require('sequelize');

// On stocke l'URL dans une constante (sans le point-virgule à l'intérieur des guillemets)
const DATABASE_URL = 'postgresql://neondb_owner:npg_hdH0ts4XcNql@ep-steep-lake-anqgv9on-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

module.exports = sequelize;