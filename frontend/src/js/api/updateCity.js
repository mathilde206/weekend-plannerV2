import axios from 'axios/index';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function updateCity(cityObj, token, pk) {
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        data: cityObj,
        url: `/api/cities/${pk}/update`,
    };
    return axios(options)
        .then(response => response.data)
        .catch(error=>error);
}

export default updateCity;
