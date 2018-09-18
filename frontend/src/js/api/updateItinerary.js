import axios from 'axios/index';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function updateItinerary(itineraryObj, token, slug) {
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        data: itineraryObj,
        url: `/api/itineraries/${slug}/update`,
    };
    return axios(options)
        .then(response => response.data);
}

export default updateItinerary;
