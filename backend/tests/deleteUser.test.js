const request = require('supertest');
const express = require('express');
const userController = require('../controller/userController');
const { getUserData } = require('../api/githubApi');

jest.mock('../api/githubApi');

const app = express();
app.use(express.json());
app.use('/userController', userController);

describe('Teste de deletar', () => {
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

    it('deve remover um usuario dos favoritos', async () => {
        await request(app).post('/userController').send({ username: 'Augcamp' });
        const deleteResponse = await request(app).delete('/userController/Augcamp');
        expect(deleteResponse.status).toBe(204);
        const getResponse = await request(app).get('/userController');
        expect(getResponse.body).toEqual([]);
    });
});
