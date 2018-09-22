import {
    requestStripePublishableKey,
    errorStripePublishableKey,
    successStripePublishableKey,
} from './stripe';

describe('Validate stripe actions', () => {
    it('it should return the right actions', () => {
        expect(requestStripePublishableKey()).toEqual({
            type: 'REQUEST_STRIPE_PUB_KEY',
        });
        expect(errorStripePublishableKey('an error')).toEqual({
            type: 'ERROR_STRIPE_PUB_KEY',
            error: 'an error',
        });
        expect(successStripePublishableKey('1234')).toEqual({
            type: 'SUCCESS_STRIPE_PUB_KEY',
            key: '1234'
        });
    });
});
