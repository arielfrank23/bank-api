const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use DATABASE_URL env var when available.
// If no DATABASE_URL and we're in development, fallback to a local sqlite file so the API can be testée localement.
let sequelize;
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false }
        },
        pool: { acquire: 60000 }
    });
} else if (process.env.NODE_ENV === 'production') {
    // production without DATABASE_URL: still try the hardcoded Neon URL (keep existing behavior)
    const connectionString = 'postgresql://neondb_owner:ariel5636@ep-steep-lake-anqgv9on-pooler.c-6.us-east-1.aws.neon.tech/neondb?uselibpqcompat=true&sslmode=require';
    sequelize = new Sequelize(connectionString, {
        dialect: 'postgres',
        dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
        pool: { acquire: 60000 }
    });
} else {
    // Local development: use sqlite file so developer can run and test endpoints & Swagger without remote DB access.
    sequelize = new Sequelize({ dialect: 'sqlite', storage: './dev.sqlite' });
}

module.exports = sequelize;