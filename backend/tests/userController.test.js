const request = require('supertest');
const express = require('express');
const userController = require('../controller/userController');
const { getUserData } = require('../api/githubApi');

jest.mock('../api/githubApi');

const app = express();
app.use(express.json());
app.use('/userController', userController);

describe('Testes unitarios', () => {
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

    describe('Teste de usuario favorito', () => {
        it('deve adicionar um usuario aos favoritos', async () => {
            const response = await request(app)
                .post('/userController')
                .send({ username: 'Augcamp' });

            expect(response.status).toBe(201);
            expect(response.body).toMatchObject(user);
        });

        it('deve retornar erro ao tentar adicionar usuario ja favorito', async () => {
            await request(app).post('/userController').send({ username: 'Augcamp' });
            const response = await request(app)
                .post('/userController')
                .send({ username: 'Augcamp' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Usuário já adicionado aos favoritos.');
        });
    });

    describe('Teste de lista de usuarios', () => {
        it('deve listar os usuarios favoritos', async () => {
            await request(app).post('/userController').send({ username: 'Augcamp' });
            const response = await request(app).get('/userController');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.arrayContaining([user]));
        });
    });

    describe('Teste de deletar', () => {
        it('deve remover um usuario dos favoritos', async () => {
            await request(app).post('/userController').send({ username: 'Augcamp' });
            const deleteResponse = await request(app).delete('/userController/Augcamp');

            expect(deleteResponse.status).toBe(204);

            const getResponse = await request(app).get('/userController');
            expect(getResponse.body).toEqual([]);
        });
    });

    describe('Teste da estrela', () => {
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


});