import validatePasswordsMatch from './validatePasswordsMatch';

describe('Validate Passwords match', () => {
    it('should be false if the password don\'t match', () => {

        expect(validatePasswordsMatch('abc123', '1234567')).toBe(false);
    });
    it('should be true if the passwords match', () => {

        expect(validatePasswordsMatch('abc123', 'abc123')).toBe(true);
    });
});