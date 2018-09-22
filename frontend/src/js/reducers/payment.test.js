import { ERROR_PAYMENT, PAYMENT_SUCCESS, REQUEST_PAYMENT, } from '../actions';
import payment from './payment';

describe('Validate payment reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(payment({}, { type: 'bla bla' })).toEqual({});
    });
    it('should return the right state for related actions', () => {
        expect(payment({}, {
            type: REQUEST_PAYMENT,
        })).toEqual({
            isLoading: true,
        });
        expect(payment({}, {
            type: PAYMENT_SUCCESS,
            pk: 1,
        })).toEqual({
            isLoading: false,
            orderCreated: true,
            OrderPk: 1,
        });
        expect(payment({}, {
            type: ERROR_PAYMENT,
            error: 'an error'
        })).toEqual({
            isLoading: false,
            error: 'an error'
        });
    });
});
