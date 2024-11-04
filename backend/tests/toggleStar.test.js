const request = require('supertest');
const express = require('express');
const userController = require('../controller/userController');
const { getUserData } = require('../api/githubApi');

jest.mock('../api/githubApi');

const app = express();
app.use(express.json());
app.use('/userController', userController);

describe('Teste de alternancia de estrela', () => {
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

    it('deve alternar a estrela de um usuario favorito', async () => {
        await request(app).post('/userController').send({ username: 'Augcamp' });
        const patchResponse = await request(app).patch('/userController/Augcamp/toggle-star');
        expect(patchResponse.status).toBe(200);
        expect(patchResponse.body.starred).toBe(true);

        const secondPatchResponse = await request(app).patch('/userController/Augcamp/toggle-star');
        expect(secondPatchResponse.status).toBe(200);
        expect(secondPatchResponse.body.starred).toBe(false);
    });
});
