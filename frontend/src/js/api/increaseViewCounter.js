import axios from 'axios/index';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function increaseViewsCounter(slug) {
    return axios.put(
        `/api/itineraries/${slug}/views`)
        .then(response => response.data);
}

export default increaseViewsCounter;
