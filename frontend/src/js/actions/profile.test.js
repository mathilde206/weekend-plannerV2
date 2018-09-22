import {
    resetProfileUpdate,
    updateProfileRequest,
    updateProfileError,
    updateProfileSuccess,
} from './profile';

describe('Validate profile actions', () => {
    it('it should return the right actions', () => {
        expect(resetProfileUpdate()).toEqual({
            type: 'RESET_PROFILE_UPDATE',
            updated: false,
            updating: false
        });
        expect(updateProfileRequest()).toEqual({
            type: 'UPDATE_PROFILE_REQUEST',
            updating: true,
        });
        expect(updateProfileError('an error')).toEqual({
            type: 'UPDATE_PROFILE_ERROR',
            error: 'an error',
            updating: false,
        });
        expect(updateProfileSuccess()).toEqual({
            type: 'UPDATE_PROFILE_SUCCESS',
            updated: true,
            updating: false
        });
    });
});
