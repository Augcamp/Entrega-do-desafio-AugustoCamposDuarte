const request = require('supertest');
const express = require('express');
const userController = require('../controller/userController');
const { getUserData } = require('../api/githubApi');

jest.mock('../api/githubApi');

const app = express();
app.use(express.json());
app.use('/userController', userController);

describe('Teste de lista de usuarios', () => {
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

    it('deve listar os usuarios favoritos', async () => {
        await request(app).post('/userController').send({ username: 'Augcamp' });
        const response = await request(app).get('/userController');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([user]));
    });
});
