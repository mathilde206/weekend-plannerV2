import axios from 'axios/index';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function saveOrder(access_token, formObj) {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'content-type': 'json'
        },
        data: formObj,
        url: '/api/checkout/order/create/',
    };
    return axios(options)
        .then(response => response.data);
}

export default saveOrder;

