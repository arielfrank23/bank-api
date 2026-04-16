const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/db'); 
const userController = require('./controllers/userController');

const app = express();
app.use(express.json());

// --- CONFIGURATION SWAGGER DIRECTE ---
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
            }
        ],
        // On définit les routes directement ici pour éviter les erreurs de lecture de fichiers
        paths: {
            '/users': {
                get: {
                    summary: 'Récupérer la liste des utilisateurs',
                    tags: ['Utilisateurs'],
                    responses: {
                        200: { description: 'Succès' }
                    }
                },
                post: {
                    summary: 'Ajouter un utilisateur',
                    tags: ['Utilisateurs'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'Utilisateur créé' }
                    }
                }
            }
        }
    },
    apis: [] // On laisse vide car tout est défini au-dessus
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- ROUTES ---
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
            res.send('<h1>Serveur Opérationnel</h1><p>Doc disponible sur <a href="/api-docs">/api-docs</a></p>');
        });

        app.listen(PORT, () => {
            console.log(`🚀 Lancé sur le port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erreur :', error);
    }
}

startServer();