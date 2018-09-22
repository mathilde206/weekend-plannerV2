import { BILLING_UPDATE_REQUEST, BILLING_UPDATE_ERROR, BILLING_UPDATE_SUCCESS } from '../actions';
import userBillingUpdate from './userBillingUpdate';

describe('Validate userBillingUpdate reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(userBillingUpdate({}, { type: 'bla bla' })).toEqual({});
    });
    it('should return the right state for related actions', () => {
        expect(userBillingUpdate({}, { type: BILLING_UPDATE_REQUEST }))
            .toEqual({
                billingUpdated: false,
                isLoading: true,
            });
        expect(userBillingUpdate({}, { type: BILLING_UPDATE_ERROR, error: 'an error' })).toEqual({
            billingUpdated: false,
            isLoading: false,
            error: 'an error',
        });
        expect(userBillingUpdate({}, { type: BILLING_UPDATE_SUCCESS, billingUpdated: true })).toEqual({
            billingUpdated: true,
            isLoading: false,
        });
    });
});
