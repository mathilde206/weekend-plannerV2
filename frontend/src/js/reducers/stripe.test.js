import { ERROR_STRIPE_PUB_KEY, REQUEST_STRIPE_PUB_KEY, SUCCESS_STRIPE_PUB_KEY } from '../actions';
import stripe from './stripe';

describe('Validate userBillingUpdate reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(stripe({}, { type: 'bla bla' })).toEqual({});
    });
    it('should return the right state for related actions', () => {
        expect(stripe({}, {
            type: REQUEST_STRIPE_PUB_KEY,
            isLoading: true,
        })).toEqual({
            isLoading: true,
        });
        expect(stripe({}, {
            type: SUCCESS_STRIPE_PUB_KEY,
            isLoading: false,
            key: '123'
        })).toEqual({
            isLoading: false,
            key: '123'
        });
        expect(stripe({}, {
            type: ERROR_STRIPE_PUB_KEY,
            isLoading: false,
            error: 'an error'
        })).toEqual({
            isLoading: false,
            error: 'an error'
        });
    });
});
