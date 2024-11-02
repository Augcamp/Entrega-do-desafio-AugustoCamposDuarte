const express = require('express');
const router = express.Router();
const { getUserData } = require('../api/githubApi');

let favorites = [];

// Adiciona usuario
router.post('/', async (req, res) => {
    const { username } = req.body;
    if (favorites.length >= 5) {
        return res.status(400).json({ error: 'Limite de favoritos atingido.' });
    }

    if (favorites.some(user => user.username === username)) {
        return res.status(400).json({ error: 'Usuário já adicionado aos favoritos.' });
    }

    try {
        const userData = await getUserData(username);
        favorites.push({ ...userData, starred: false });
        res.status(201).json(userData);
    } catch (error) {
        res.status(404).json({ error: 'Usuário não encontrado no GitHub.' });
    }
});

// Lista usuarios favoritos
router.get('/', (req, res) => {
    res.json(favorites);
});

// Remove usuario da lista
router.delete('/:username', (req, res) => {
    const { username } = req.params;
    favorites = favorites.filter(user => user.username !== username);
    res.status(204).end();
});

// Alterna a estrela de um usuário
router.patch('/:username/toggle-star', (req, res) => {
    const { username } = req.params;
    favorites = favorites.map(user => ({
        ...user,
        starred: user.username === username ? !user.starred : false
    }));
    res.json(favorites.find(user => user.username === username));
});

module.exports = router;
