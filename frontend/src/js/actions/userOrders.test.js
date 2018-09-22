import {
    requestUserOrders,
    errorUserOrders,
    receiveUserOrders,
} from './userOrders';

describe('Validate user orders actions', () => {
    it('it should return the right actions', () => {
        expect(requestUserOrders()).toEqual({
            type: 'USER_ORDER_REQUEST',
        });
        expect(receiveUserOrders([ 1, 2, 3 ])).toEqual({
            type: 'USER_ORDER_SUCCESS',
            orders: [ 1, 2, 3 ]
        });
        expect(errorUserOrders('an error')).toEqual({
            type: 'USER_ORDER_ERROR',
            error: 'an error',
        });
    });
});
