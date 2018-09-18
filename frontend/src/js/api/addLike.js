import axios from 'axios/index';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function addLike(slug, token) {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        url: `/api/itineraries/${slug}/like`,
    };
    return axios(options)
        .then(response => response.data);

}

export default addLike;
