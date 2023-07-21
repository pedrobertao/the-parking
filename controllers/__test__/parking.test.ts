import server from '../../app'
import supertest from 'supertest';
import mongoose from 'mongoose';
const request = supertest(server);

const databaseName = 'test'


describe('User Endpoints', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/${databaseName}`
        await mongoose.connect(url)
    })

    it('GET /user should show all users', async () => {
        //        try {
        const res = await request.post('api/v1/parking').send({ plate: "BRA2E19" })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        console.log("====>1", res)
        // } catch (error) {
        //     console.log("====>2", error)

        // }

    });

});