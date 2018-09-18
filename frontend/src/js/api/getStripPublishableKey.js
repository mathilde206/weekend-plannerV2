import axios from 'axios/index';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function getStripePublishableKey(token) {
    return axios.get('/api/checkout/token/', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.data);
}

export default getStripePublishableKey;
