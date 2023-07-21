import server from '../../app'
import supertest from 'supertest';
const request = supertest(server);


describe('/parking', () => {
    const plate = "BRA9E21"
    let idPlate = ""
    it('Register a plate', async () => {
        const res = await request.post('/api/v1/parking').send({ plate })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.plate).toEqual(plate)
        idPlate = res.body.id.toString()
    });

    it('Paid a plate', async () => {
        const res = await request.put(`/api/v1/parking/${idPlate}/pay`)
            .send({ amount: 20 })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
    });

    it('Car leave place', async () => {
        const res = await request.put(`/api/v1/parking/${idPlate}/out`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);

    });
});