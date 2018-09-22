import {
    requestProductInfo,
    removeFromCartAction,
    emptyCartAction,
    getCart,
    successProductDetails,
    errorAddToCard,
} from './cart';

describe('Validate cart actions', () => {
    it('it should return the right actions', () => {
        expect(requestProductInfo()).toEqual({
            type: 'REQUEST_PRODUCT_INFO',
        });
        expect(successProductDetails()).toEqual({
            type: 'ADD_TO_CART',
        });
        expect(errorAddToCard('an error')).toEqual({
            type: 'ERROR_ADD_TO_CART',
            error: 'an error',
        });
        expect(removeFromCartAction(1)).toEqual({
            type: 'REMOVE_FROM_CART',
            productId: 1,
        });
        expect(emptyCartAction()).toEqual({
            type: 'EMPTY_CART',
        });
        expect(getCart([ 1, 2, 3 ])).toEqual({
            type: 'HYDRATE_CART',
            cart: [ 1, 2, 3 ]
        });
    });
});

