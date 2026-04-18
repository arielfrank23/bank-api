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
                url: 'http://localhost:3000',
                description: 'Serveur local',
            }
        ],
        paths: {
            '/users': {
                get: {
                    summary: 'Récupérer la liste des utilisateurs',
                    tags: ['Utilisateurs'],
                    responses: { 200: { description: 'Succès' } }
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
                                        nom: { type: 'string', example: 'Ariel' },
                                        prenom: { type: 'string', example: 'Frank' },
                                        email: { type: 'string', example: 'ariel@gmail.com' },
                                        telephone: { type: 'string', example: '+33123456789' },
                                        adresse: { type: 'string', example: '1 rue Exemple' },
                                        solde: { type: 'number', example: 1000 }
                                    },
                                    required: ['nom', 'prenom', 'email']
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'Utilisateur créé' },
                        400: { description: 'Erreur de validation' }
                    }
                }
            },
            '/users/{id}': {
                get: {
                    summary: 'Récupérer un utilisateur par id',
                    tags: ['Utilisateurs'],
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 200: { description: 'Succès' }, 404: { description: 'Non trouvé' } }
                },
                put: {
                    summary: 'Mettre à jour un utilisateur',
                    tags: ['Utilisateurs'],
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { type: 'object' }
                            }
                        }
                    },
                    responses: { 200: { description: 'Mis à jour' }, 400: { description: 'Erreur' }, 404: { description: 'Non trouvé' } }
                },
                delete: {
                    summary: 'Supprimer un utilisateur',
                    tags: ['Utilisateurs'],
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 204: { description: 'Supprimé' }, 404: { description: 'Non trouvé' } }
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
// Endpoints CRUD par id
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion DB réussie.');
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => console.log(`🚀 Serveur sur le port ${PORT}`));
    } catch (error) {
        console.error('❌ Erreur :', error);
    }
}

startServer();