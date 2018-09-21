import validateEmail from './validateEmail';

describe('Email validation', () => {
    it('should be false if email doesn\'t have @', () => {

        expect(validateEmail('mathilde')).toBe(false);
    });
    it('should be false if it has less than 6 characters', () => {

        expect(validateEmail('a@b.cd')).toBe(false);
    });
});
