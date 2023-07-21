
import { Parking } from '../../models/Parking';
import mockingoose from 'mockingoose'

jest.mock('../../models/Parking');

mockingoose(Parking).toReturn([
    {}
], 'find');

describe('app', () => {
    it('should return mocked users from /users route', async () => {

    });
});