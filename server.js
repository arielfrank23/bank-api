const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/db'); // Chemin corrigé selon ta structure
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
                url: 'https://bank-api-ariel.onrender.com', // URL de production
                description: 'Serveur de Production',
            },
            {
                url: 'http://localhost:3000',
                description: 'Serveur Local',
            },
        ],
    },
    // Scanne le fichier actuel et tous les fichiers dans controllers pour la doc
    apis: ['./server.js', './controllers/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- DOCUMENTATION DES ROUTES (Pour Swagger) ---

/**
 * @swagger
 * /users:
 * get:
 * summary: Récupérer la liste des utilisateurs
 * tags: [Utilisateurs]
 * responses:
 * 200:
 * description: Liste récupérée avec succès
 */
app.get('/users', userController.getUsers);

/**
 * @swagger
 * /users:
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
app.post('/users', userController.createUser);

// --- DÉMARRAGE ET CONNEXION ---
const PORT = process.env.PORT || 3000; // Port dynamique indispensable pour Render

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion DB réussie.');
        
        await sequelize.sync(); // Synchronise les modèles avec la DB

        app.get('/', (req, res) => {
            res.send('Bienvenue sur mon API Bancaire ! Allez sur /api-docs pour voir la doc.');
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