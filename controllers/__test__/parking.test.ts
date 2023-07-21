import server from '../../app'
import supertest from 'supertest';
const request = supertest(server);


describe('Parking', () => {
    const plate = "BRA9223"
    let idPlate = ""
    it('Register a plate', async () => {
        const res = await request.post('/api/v1/parking').send({ plate })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.plate).toEqual(plate)
        idPlate = res.body.id
    });

    it('Paid a plate', async () => {
        const res = await request.put(`/api/v1/parking/${idPlate}/pay`)
            .send({ amount: 20 })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.success).toBeTruthy()

    });

    it('Car leave place', async () => {
        const res = await request.put(`/api/v1/parking/${idPlate}/out`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.success).toBeTruthy()

    });

    it('Get history of the plate', async () => {
        const res = await request.get(`/api/v1/parking/${plate}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.success).toBeTruthy()
        const userHistory = res.body.user
        expect(userHistory).toHaveLength(1)
        expect(userHistory[0].plate).toEqual(plate)
        expect(userHistory[0].id).toEqual(idPlate)
        expect(userHistory[0].paidAmount).toEqual(20)
        expect(userHistory[0].left).toBeTruthy()
        expect(userHistory[0].paid).toBeTruthy()

    });

    it('Invalid plate', async () => {
        const res = await request.post('/api/v1/parking').send({ plate: "BBBBBRA9E22" })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(400);
        expect(res.body.success).toBeFalsy()
    });

    it('Invalid plate', async () => {
        const res = await request.post('/api/v1/parking').send({ plate: "BBBBBRA9E22" })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(400);
        expect(res.body.success).toBeFalsy()
    });

    const newPlate = "BRA9224"
    let newIdPlate = ""
    it('Register a new plate', async () => {
        const res = await request.post('/api/v1/parking').send({ plate: newPlate })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.plate).toEqual(newPlate)
        newIdPlate = res.body.id
    });

    it('Car try to leaving without paying', async () => {
        const res = await request.put(`/api/v1/parking/${newIdPlate}/out`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(400);
        expect(res.body.success).toBeFalsy()

    });

    it('New car pays', async () => {
        const res = await request.put(`/api/v1/parking/${newIdPlate}/pay`)
            .send({ amount: 10 })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.success).toBeTruthy()

    });

    it('New car pays again and can`t', async () => {
        const res = await request.put(`/api/v1/parking/${newIdPlate}/pay`)
            .send({ amount: 10 })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(400);
        expect(res.body.success).toBeFalsy()

    });


    it('New car leaves', async () => {
        const res = await request.put(`/api/v1/parking/${newIdPlate}/out`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.success).toBeTruthy()

    });

    it('New car tries to leave again but can`t', async () => {
        const res = await request.put(`/api/v1/parking/${newIdPlate}/out`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(400);
        expect(res.body.success).toBeFalsy()
    });

});

