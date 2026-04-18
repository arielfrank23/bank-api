const User = require('../models/User');

// Contract (inputs/outputs):
// - createUser(req.body) -> crée un utilisateur (nom, prenom, email, telephone, adresse, solde)
// - getUsers() -> liste de tous les utilisateurs
// - getUserById(id) -> utilisateur ou 404
// - updateUser(id, body) -> utilisateur mis à jour ou 404
// - deleteUser(id) -> 204 ou 404

exports.createUser = async (req, res) => {
    try {
        const { nom, prenom, email } = req.body;
        if (!nom || !prenom || !email) {
            return res.status(400).json({ error: 'nom, prenom et email sont requis' });
        }

        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

        const [updatedCount] = await User.update(req.body, { where: { id } });
        if (updatedCount === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });

        const updatedUser = await User.findByPk(id);
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

        const deletedCount = await User.destroy({ where: { id } });
        if (deletedCount === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};