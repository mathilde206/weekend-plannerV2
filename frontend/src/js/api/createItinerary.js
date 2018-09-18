import axios from 'axios/index';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function createItinerary(itineraryObj, token) {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        data: itineraryObj,
        url: '/api/itineraries/create/',
    };
    return axios(options)
        .then(response => response.data);
}

export default createItinerary;
