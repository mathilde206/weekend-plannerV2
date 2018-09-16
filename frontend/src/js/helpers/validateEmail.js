const validateEmail = (email) => {
    return (
        email.indexOf('@') > -1 ||
        email.length > 6
    );
};

export default validateEmail;
