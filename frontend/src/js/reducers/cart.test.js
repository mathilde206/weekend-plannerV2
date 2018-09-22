import {
    ADD_TO_CART,
    ERROR_ADD_TO_CART,
    EMPTY_CART,
    REMOVE_FROM_CART,
} from '../actions';

import cart from './cart';

describe('Validate cart reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(cart({}, { type: 'bla bla' })).toEqual({});
    });
    it('should return the right state for related actions', () => {
        expect(cart({ cart: [ { price: 100, pk: 1 } ], total: 100 }, {
            type: ADD_TO_CART,
            product: { price: 100, pk: 2 }
        })).toEqual({
            cart: [ { price: 100, pk: 1 }, { price: 100, pk: 2 } ],
            total: 200
        });
        expect(cart({ cart: [ { price: 100, pk: 1 } ], total: 100 }, {
            type: ERROR_ADD_TO_CART,
            error: 'an error'
        })).toEqual({
            cart: [ { price: 100, pk: 1 } ],
            total: 100,
            error: 'an error'
        });
        expect(cart({ cart: [ { price: 100, pk: 1 }, { price: 100, pk: 2 } ], total: 200 }, {
            type: REMOVE_FROM_CART,
            productId: 2,
        })).toEqual({
            cart: [ { price: 100, pk: 1 } ],
            total: 100,
        });
        expect(cart({ cart: [ { price: 100, pk: 1 } ], total: 100 }, {
            type: EMPTY_CART,
        })).toEqual({
            cart: [],
            total: 0,
        });
    });
});
