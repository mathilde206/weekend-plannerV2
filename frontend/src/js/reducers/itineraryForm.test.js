import {
    CITY_CREATE,
    CITY_CREATE_REQUEST,
    INITIALIZE_FORM,
    INITIALIZE_FORM_FAILURE,
    INITIALIZE_FORM_REQUEST,
    CITY_CREATE_FAILURE,
    FORM_SUBMITTED,
    ITINERARY_CREATED,
    ITINERARY_CREATION_FAILURE,
    ITINERARY_UPDATED_FAILURE,
    REQUEST_ITINERARY_UPDATE,
    ITINERARY_UPDATED,
    RESET_FORM
} from '../actions';
import itineraryForm from './itineraryForm';

describe('Validate itineraryForm reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(itineraryForm({}, { type: 'bla bla' })).toEqual({});
    });
    it('should return the right state for related actions', () => {
        expect(itineraryForm({}, {
            type: INITIALIZE_FORM_REQUEST,
            isLoading: true,
        })).toEqual({
            isLoading: true,
        });
        expect(itineraryForm({}, {
            type: INITIALIZE_FORM_FAILURE,
            error: 'an error',
            isLoading: false,
        })).toEqual({
            error: 'an error',
            isLoading: false,
        });
        expect(itineraryForm({}, {
            type: INITIALIZE_FORM,
            formData: { k1: 1, k2: 2 },
            steps: [ 1, 2, 4 ],
            previouslyCreatedCities: [ 1 ],
        })).toEqual({
            formData: { k1: 1, k2: 2 },
            steps: [ 1, 2, 4 ],
            previouslyCreatedCities: [ 1 ],
        });
        expect(itineraryForm({}, {
            type: CITY_CREATE_REQUEST,
        })).toEqual({
            cityIsLoading: true,
        });
        expect(itineraryForm({ formData: { k1: 1 } }, {
            type: CITY_CREATE,
            // formData: {k2:2, k3:3}
            cityData: { pk: 1, name: 'a city' }
        })).toEqual({
            cityIsLoading: false,
            formData: {
                cityPk: 1,
                k1: 1,
                pk: 1,
                name: 'a city'
            }
        });
        expect(itineraryForm({}, {
            type: CITY_CREATE_FAILURE,
            cityError: 'an error'
        })).toEqual({
            cityError: 'an error',
        });
        expect(itineraryForm({}, {
            type: FORM_SUBMITTED,
        })).toEqual({
            isLoading: true,
        });
        expect(itineraryForm({}, {
            type: ITINERARY_CREATED,
            data: { slug: 'a-slug' }
        })).toEqual({
            itinerarySlug: 'a-slug',
            isLoading: false,
            submitted: true,
        });
        expect(itineraryForm({}, {
            type: ITINERARY_CREATION_FAILURE,
            error: 'an error'
        })).toEqual({
            error: 'an error',
            isLoading: false,
            submitted: false,
        });
        expect(itineraryForm({}, {
            type: ITINERARY_UPDATED_FAILURE,
            error: 'an error'
        })).toEqual({
            error: 'an error',
            isLoading: false,
        });
        expect(itineraryForm({}, {
            type: REQUEST_ITINERARY_UPDATE,
        })).toEqual({
            isLoading: true,
        });
        expect(itineraryForm({}, {
            type: ITINERARY_UPDATED,
            updated: true
        })).toEqual({
            updated: true,
            isLoading: false,
        });
        expect(itineraryForm({ formData: { k1: 1, k2: 2 } }, {
            type: RESET_FORM,
        })).toEqual({
            formData: {}
        });
    });
});
