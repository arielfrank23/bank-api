const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        // req.body contiendra maintenant { "name": "...", "email": "..." }
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