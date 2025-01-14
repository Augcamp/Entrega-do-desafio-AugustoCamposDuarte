const request = require('supertest');
const express = require('express');
const userController = require('../controller/userController');
const { getUserData } = require('../api/githubApi');

jest.mock('../api/githubApi');

const app = express();
app.use(express.json());
app.use('/userController', userController);

describe('Teste de usuario favorito', () => {
    const user = {
        username: 'Augcamp',
        name: 'Augusto Duarte',
        avatar: 'https://avatars.githubusercontent.com/u/87672417?v=4',
        url: 'https://github.com/Augcamp',
        starred: false,
    };

    beforeEach(() => {
        getUserData.mockClear();
        getUserData.mockResolvedValue(user);
    });

    it('deve adicionar um usuario aos favoritos', async () => {
        const response = await request(app).post('/userController').send({ username: 'Augcamp' });
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(user);
    });

    it('deve retornar erro ao tentar adicionar usuario ja favorito', async () => {
        await request(app).post('/userController').send({ username: 'Augcamp' });
        const response = await request(app).post('/userController').send({ username: 'Augcamp' });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Usuário já adicionado aos favoritos.');
    });
});
