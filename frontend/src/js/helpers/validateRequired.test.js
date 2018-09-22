import validateRequired from './validateRequired';

describe('Validate the field is required', () => {
    it('it should be false if the field is empty', () => {

        expect(validateRequired('')).toBe(false);
    });
    it('should be true if the field is not empty', () => {

        expect(validateRequired('a')).toBe(true);
    });
});