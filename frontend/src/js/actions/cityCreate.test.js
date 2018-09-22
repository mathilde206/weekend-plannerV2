import {
    cityCreateSuccess,
    cityCreateFailure,
    cityCreateRequest,
} from './cityCreate';

describe('Validate city creation actions', () => {
    it('it should return the right actions', () => {
        expect(cityCreateRequest()).toEqual({
            type: 'CITY_CREATE_REQUEST',
            isLoading: true,
        });
        expect(cityCreateFailure('an error')).toEqual({
            type: 'CITY_CREATE_FAILURE',
            cityError: 'an error',
        });
        expect(cityCreateSuccess({city: 'city', country: 'country', language:'language', currency: 'currency'})).toEqual({
            type: 'CITY_CREATE',
            cityData: {city: 'city', country: 'country', language:'language', currency: 'currency'},
        });
    });
});
