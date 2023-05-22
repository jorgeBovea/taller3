const request = require('supertest');
const mongoose = require('mongoose');

const { goodNewUser, badNewUser } = require('./testData');
const app = require('../app');

beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL);
}, 10000);

afterAll(async () => {
    await mongoose.connection.close();
}, 10000);

describe('Pruebas Unitarias Controlador Accounts', () => {
    describe('Pruebas Endpoint Register', () => {

        test('Prueba de registro, petición sin datos', async () => {
            const response = await request(app).
                                   post('/accounts/register').
                                   send();
            expect(response.statusCode).toBe(400);
        });

        test('Prueba de registro, peticion datos faltantes', async () => {
            const response = await request(app)
                                  .post('/accounts/register')
                                  .send(badNewUser);
            expect(response.statusCode).toBe(400);
        });

        test('Prueba de registro, peticion datos correctos', async () => {
            const response = await request(app)
                                  .post('/accounts/register')
                                  .send(goodNewUser);
            expect(response.statusCode).toBe(200);
            
        });
        

    });
});
