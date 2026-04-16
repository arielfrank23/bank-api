const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/db'); 
const userController = require('./controllers/userController');

const app = express();
app.use(express.json());

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
                                        name: { type: 'string', example: 'Ariel' },
                                        email: { type: 'string', example: 'ariel@gmail.com' },
                                        solde: { type: 'number', example: 1000 }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'Utilisateur créé' },
                        400: { description: 'Erreur de validation' }
                    }
                }
            }
        }
    },
    apis: [] 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/users', userController.getUsers);
app.post('/users', userController.createUser);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion DB réussie.');
        await sequelize.sync({ alter: true }); // Applique les changements (comme le passage de nom à name)
        app.listen(PORT, () => console.log(`🚀 Serveur sur le port ${PORT}`));
    } catch (error) {
        console.error('❌ Erreur :', error);
    }
}

startServer();