const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/db'); 
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
                description: 'Serveur de Production',
            },
            {
                url: 'http://localhost:3000',
                description: 'Serveur Local',
            },
        ],
    },
    apis: ['./server.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- DOCUMENTATION DES ROUTES ---

/**
 * @swagger
 * /users:
 * get:
 * summary: Récupérer la liste des utilisateurs
 * tags: [Utilisateurs]
 * responses:
 * 200:
 * description: Liste récupérée avec succès
 * post:
 * summary: Ajouter un utilisateur
 * tags: [Utilisateurs]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * email:
 * type: string
 * responses:
 * 201:
 * description: Utilisateur créé
 */
app.get('/users', userController.getUsers);
app.post('/users', userController.createUser);

// --- DÉMARRAGE ---
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion DB réussie.');
        
        await sequelize.sync();

        app.get('/', (req, res) => {
            res.send('<h1>Bienvenue sur mon API Bancaire !</h1><p>Allez sur <a href="/api-docs">/api-docs</a> pour voir la doc.</p>');
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