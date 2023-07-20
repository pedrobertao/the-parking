import { app } from '../../app'
import supertest from 'supertest'
import mockMongoClient from '@shelf/jest-mongodb'

const mockMongoClient = mockMongoClient();

const requestWithSuperTest = supertest(app)


describe('Testing /parking', () => {

    it('GET /user should show all users', async () => {
        const res = await requestWithSuperTest.get('/api/v1/parking');
        expect(res.status).toEqual(200);
        // expect(res.type).toEqual(expect.stringContaining('json'));
        // expect(res.body).toHaveProperty('users')
    });

});

describe('Testing /', () => {

    it('GET /user should show all users', async () => {
        const res = await requestWithSuperTest.get('/api/v1/parking');
        expect(res.status).toEqual(200);
        // expect(res.type).toEqual(expect.stringContaining('json'));
        // expect(res.body).toHaveProperty('users')
    });

});

describe('Testing /', () => {

    it('GET /user should show all users', async () => {
        const res = await requestWithSuperTest.get('/api/v1/parking');
        expect(res.status).toEqual(200);
        // expect(res.type).toEqual(expect.stringContaining('json'));
        // expect(res.body).toHaveProperty('users')
    });

});

describe('Testing /', () => {

    it('GET /user should show all users', async () => {
        const res = await requestWithSuperTest.get('/api/v1/parking');
        expect(res.status).toEqual(200);
        // expect(res.type).toEqual(expect.stringContaining('json'));
        // expect(res.body).toHaveProperty('users')
    });

});

describe('Testing /', () => {

    it('GET /user should show all users', async () => {
        const res = await requestWithSuperTest.get('/api/v1/parking');
        expect(res.status).toEqual(200);
        // expect(res.type).toEqual(expect.stringContaining('json'));
        // expect(res.body).toHaveProperty('users')
    });

});

describe('Testing /', () => {

    it('GET /user should show all users', async () => {
        const res = await requestWithSuperTest.get('/api/v1/parking');
        expect(res.status).toEqual(200);
        // expect(res.type).toEqual(expect.stringContaining('json'));
        // expect(res.body).toHaveProperty('users')
    });

});