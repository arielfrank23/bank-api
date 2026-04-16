const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/db'); // On ajoute /config/ devant
const userController = require('./controllers/userController');

const app = express();
app.use(express.json());

// --- CONFIGURATION SWAGGER ---
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Bancaire Ariel',
            version: '1.0.0',
            description: 'Gestion des transactions et utilisateurs',
        },
        servers: [
            {
                url: 'https://bank-api-ariel.onrender.com',
                description: 'Serveur de Production'
            },
            {
                url: 'http://localhost:3000',
                description: 'Serveur Local'
            },
        ],
    },
    apis: ['./routes/*.js', 'server.js'], // Ajuste selon où sont tes commentaires Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- ROUTES RÉELLES ---
app.post('/users', userController.createUser);
app.get('/users', userController.getUsers);

// --- DÉMARRAGE ---
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Test de la connexion à Neon
        await sequelize.authenticate();
        console.log('✅ Connexion DB réussie.');

        // Synchronisation des modèles avec la base
        await sequelize.sync();

        // Route d'accueil pour éviter le "Not Found"
        app.get('/', (req, res) => {
            res.send('<h1>Bienvenue sur mon API Bancaire !</h1><p>Allez sur <a href="/api-docs">/api-docs</a> pour voir la documentation.</p>');
        });

        app.listen(PORT, () => {
            console.log(`\n🚀 Serveur : http://localhost:${PORT}`);
            console.log(`📖 Swagger : http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('❌ Erreur de démarrage :', error);
    }
}

startServer();