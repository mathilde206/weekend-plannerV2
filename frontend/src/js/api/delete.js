import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function deleteItinerary(slug, token) {
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        url: `/api/itineraries/${slug}/delete`,
    };
    return axios(options)
        .then(response => response.data);
}

export default deleteItinerary;
