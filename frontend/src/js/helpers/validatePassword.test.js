import validatePassword from './validatePassword';

describe('Validate Password length', () => {
    it('should be false if the password is less than 8 characters', () => {

        expect(validatePassword('abc123')).toBe(false);
    });
    it('should be true if the password has more than 8 characters', () => {

        expect(validatePassword('abc123ab')).toBe(true);
    });
});