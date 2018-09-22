import validateEmailsMatch from './validateEmailsMatch';

describe('Validate Emails Match', () => {
    it('should be false if emails don\'t match', () => {

        expect(validateEmailsMatch('mathilde@gmail.com', 'bob@gmail.com')).toBe(false);
    });
    it('should be true if if the emails match', () => {

        expect(validateEmailsMatch('a@b.cd','a@b.cd')).toBe(true);
    });
});
