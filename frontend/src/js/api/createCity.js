import axios from 'axios/index';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';


function createCity(cityObj, token) {
    return axios.post('/api/cities/create/', cityObj, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.data);
}

export default createCity;
