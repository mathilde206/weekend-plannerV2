import {
    resetForm,
    getSteps,
    requestInitializeForm,
    initializeAction,
    initializeFormFailure,
    submitItinerary,
    itineraryCreatedSuccess,
    itineraryCreationFailure,
} from './createItinerary';

describe('Validate itinerary creation actions', () => {
    it('should return the correct list of steps depending on the number of days ', () => {
        expect(getSteps(1)).toEqual([ 1, 2, 3, 6 ]);
        expect(getSteps(2)).toEqual([ 1, 2, 3, 4, 6 ]);
        expect(getSteps(3)).toEqual([ 1, 2, 3, 4, 5, 6 ]);
    });
    it('it should return the right actions', () => {
        expect(resetForm()).toEqual({
            type: 'RESET_FORM',
        });
        expect(requestInitializeForm()).toEqual({
            type: 'INITIALIZE_FORM_REQUEST',
            isLoading: true,
        });
        expect(initializeAction('Paris', 2, getSteps(2), 1)).toEqual({
            type: 'INITIALIZE_FORM',
            formData: {
                city: 'Paris',
                number_of_days: 2,
            },
            steps: [ 1, 2, 3, 4, 6 ],
            previouslyCreatedCities: 1,
            isLoading: false,
        });
        expect(initializeFormFailure('an error')).toEqual({
            type: 'INITIALIZE_FORM_FAILURE',
            djangoError: 'an error',
            isLoading: false,
        });
        expect(submitItinerary()).toEqual({
            type: 'FORM_SUBMITTED',
        });
        expect(itineraryCreatedSuccess('some data')).toEqual({
            type: 'ITINERARY_CREATED',
            data: 'some data'
        });
        expect(itineraryCreationFailure('an error')).toEqual({
            type: 'ITINERARY_CREATION_FAILURE',
            djangoError: 'an error',
        });
    });
});
