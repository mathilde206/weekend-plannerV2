import {
    requestBillingUpdate,
    errorBillingUpdate,
    successBillingUpdate,
} from './updateBillingInfo';

describe('Validate update billing info actions', () => {
    it('it should return the right actions', () => {
        expect(requestBillingUpdate()).toEqual({
            type: 'BILLING_UPDATE_REQUEST',
        });
        expect(errorBillingUpdate('an error')).toEqual({
            type: 'BILLING_UPDATE_ERROR',
            error: 'an error',
        });
        expect(successBillingUpdate()).toEqual({
            type: 'BILLING_UPDATE_SUCCESS',
            billingUpdated: true
        });
    });
});
