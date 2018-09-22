import {
    requestCityUpdate,
    errorCityUpdate,
    successCityUpdate,
} from './updateCity';

describe('Validate update city actions', () => {
    it('it should return the right actions', () => {
        expect(requestCityUpdate()).toEqual({
            type: 'UPDATE_CITY_REQUEST',
            isLoading: true,
        });
        expect(errorCityUpdate('an error')).toEqual({
            type: 'UPDATE_CITY_ERROR',
            updated: false,
            isLoading: false,
            error: 'an error',
        });
        expect(successCityUpdate(1)).toEqual({
            type: 'UPDATE_CITY_SUCCESS',
            updated: true,
            isLoading: false,
            city: 1,
        });
    });
});
