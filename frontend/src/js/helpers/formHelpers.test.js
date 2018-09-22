import {
    createFormObj,
    validateStep0Input,
    validateStep1Input,
    validateStep2Input,
    validateDayInput,
} from './formHelpers';

describe('Itinerary form creation helpers', () => {
    it('should should return an error for the city field if no city is provided at the step 0', () => {
        expect(validateStep0Input('')).toEqual({ city: 'This value is required' });
    });
    it('should should return no error for the city field if a city is provided at the step 0', () => {
        expect(validateStep0Input('a city')).toEqual({ city: '' });
    });
    it('should should return an error for the city field if no city is provided at the step 1', () => {
        expect(validateStep1Input('', 'country', 'language', 'currency')).toEqual({
            city: 'This value is required',
            country: '',
            language: '',
            currency: '',
        });
    });
    it('should should return an error for the country field if no country is provided at the step 1', () => {
        expect(validateStep1Input('city', '', 'language', 'currency')).toEqual({
            city: '',
            country: 'This value is required',
            language: '',
            currency: '',
        });
    });
    it('should should return an error for the language field if no language is provided at the step 1', () => {
        expect(validateStep1Input('city', 'country', '', 'currency')).toEqual({
            city: '',
            country: '',
            language: 'This value is required',
            currency: ''
        });
    });
    it('should should return an error for the currency field if no currency is provided at the step 1', () => {
        expect(validateStep1Input('city', 'country', 'language', '')).toEqual({
            city: '',
            country: '',
            language: '',
            currency: 'This value is required',
        });
    });
    it('should should return an error for all fields if nothing is provided at step 1', () => {
        expect(validateStep1Input('', '', '', '')).toEqual({
            city: 'This value is required',
            country: 'This value is required',
            language: 'This value is required',
            currency: 'This value is required'
        });
    });
    it('should should return an no error if all fields are provided at step 1', () => {
        expect(validateStep1Input('city', 'country', 'language', 'currency')).toEqual({
            city: '',
            country: '',
            language: '',
            currency: ''
        });
    });
    it('should should return an error if the title is not provided at step 2', () => {
        expect(validateStep2Input('')).toEqual({ title: 'This value is required' });
    });
    it('should should return no errors if the title is provided at step 2', () => {
        expect(validateStep2Input('a title')).toEqual({ title: '' });
    });
    it('should should return no error if all fields are entered', () => {
        expect(validateDayInput('morning desc', 'lunch desc', 'afternoon desc', 'diner desc', 'day1')).toEqual({
            day1_morning: '',
            day1_lunch: '',
            day1_afternoon: '',
            day1_diner: ''
        });
    });
    it('should should return an error on all fields if all fields are empty', () => {
        expect(validateDayInput('', '', '', '', 'day1')).toEqual({
            day1_morning: 'This value is required',
            day1_lunch: 'This value is required',
            day1_afternoon: 'This value is required',
            day1_diner: 'This value is required'
        });
    });
});
