import { USER_ORDERS_REQUEST, USER_ORDERS_SUCCESS, USER_ORDERS_ERROR } from '../actions';
import userOrders from './userOrders';

describe('Validate userOrder reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(userOrders({}, { type: 'bla bla' })).toEqual({});
    });
    it('should return the right state for related actions', () => {
        expect(userOrders({}, { type: USER_ORDERS_REQUEST })).toEqual({ isFetching: true });
        expect(userOrders({}, { type: USER_ORDERS_SUCCESS, orders: [ 1, 2, 3 ] })).toEqual({
            isFetching: false,
            orders: [ 1, 2, 3 ]
        });
        expect(userOrders({}, { type: USER_ORDERS_ERROR, error: 'an error' })).toEqual({
            isFetching: false,
            error: 'an error'
        });
    });
});
