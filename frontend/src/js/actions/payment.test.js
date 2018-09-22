import {
    requestPayment,
    errorPayment,
    successPayment
} from './payment';

describe('Validate payment actions', () => {
    it('it should return the right actions', () => {
        expect(requestPayment()).toEqual({
            type: 'REQUEST_PAYMENT',
        });
        expect(errorPayment('an error')).toEqual({
            type: 'ERROR_PAYMENT',
            error: 'an error',
        });
        expect(successPayment(1)).toEqual({
            type: 'PAYMENT_SUCCESS',
            orderPk: 1,
        });
    });
});
