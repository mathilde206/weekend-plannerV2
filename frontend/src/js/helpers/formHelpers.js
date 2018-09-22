const validateStep0Input = (city) => {
    return {
        city: validateValue(city, 'required'),
    };
};

const validateStep1Input = (city, country, language, currency) => {
    return {
        city: validateValue(city, 'required'),
        country: validateValue(country, 'required'),
        language: validateValue(language, 'required'),
        currency: validateValue(currency, 'required'),
    };
};

const validateStep2Input = (title) => {
    return {
        title: validateValue(title, 'required'),
    };
};

const validateDayInput = (morning, lunch, afternoon, diner, day) => {
    return {
        [ `${day}_morning` ]: validateValue(morning, 'required'),
        [ `${day}_lunch` ]: validateValue(lunch, 'required'),
        [ `${day}_afternoon` ]: validateValue(afternoon, 'required'),
        [ `${day}_diner` ]: validateValue(diner, 'required'),
    };
};

const validateValue = (value, validationRule) => {
    switch (validationRule) {
    case 'required':
        if (!value) {
            return 'This value is required';
        }
        return '';
    default:
        return '';
    }
};

const createFormObj = (state) => {
    let formObj = new FormData();
    formObj.append('city', state.cityPk);
    formObj.append('number_of_days', String(state.number_of_days));
    formObj.append('title', state.title);
    formObj.append('budget', state.budget);
    formObj.append('day1_morning', state.day1_morning);
    formObj.append('day1_lunch', state.day1_lunch);
    formObj.append('day1_afternoon', state.day1_afternoon);
    formObj.append('day1_diner', state.day1_diner);
    formObj.append('image', state.image);

    if (parseInt(state.number_of_days) > 1) {
        formObj.append('day2_morning', state.day2_morning);
        formObj.append('day2_lunch', state.day2_lunch);
        formObj.append('day2_afternoon', state.day2_afternoon);
        formObj.append('day2_diner', state.day2_diner);
    }

    if (parseInt(state.number_of_days) > 2) {
        formObj.append('day3_morning', state.day3_morning);
        formObj.append('day3_lunch', state.day3_lunch);
        formObj.append('day3_afternoon', state.day3_afternoon);
        formObj.append('day3_diner', state.day3_diner);
    }

    return formObj;
};

export {
    createFormObj,
    validateStep0Input,
    validateStep1Input,
    validateStep2Input,
    validateDayInput,
    validateValue,
};
