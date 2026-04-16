const express = require('express');
const sequelize = require('./config/db');
const userController = require('./controllers/userController');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

// --- CONFIGURATION SWAGGER SÉCURISÉE (Sans commentaires JSDoc fragiles) ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestion Bancaire',
      version: '1.0.0',
      description: 'Système de gestion des utilisateurs et des transactions',
    },
    servers: [{ url: 'http://localhost:3000' }],
    // On définit les routes ici directement en objet JS
    paths: {
      '/users': {
        get: {
          summary: 'Récupérer la liste des utilisateurs',
          tags: ['Users'],
          responses: {
            200: { description: 'Succès' }
          }
        },
        post: {
          summary: 'Ajouter un utilisateur',
          tags: ['Users'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nom: { type: 'string', example: 'Ariel Zebaze' },
                    email: { type: 'string', example: 'ariel@example.com' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Créé' }
          }
        }
      }
    }
  },
  apis: [], // On laisse vide car on a tout défini au-dessus
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- ROUTES RÉELLES ---
app.post('/users', userController.createUser);
app.get('/users', userController.getUsers);

// --- DÉMARRAGE ---
const PORT = 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion DB réussie.');
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`\n🚀 Serveur : http://localhost:${PORT}`);
      console.log(`📖 Swagger : http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Erreur :', error);
  }
}

startServer();