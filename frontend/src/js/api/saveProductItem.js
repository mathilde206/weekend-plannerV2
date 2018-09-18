import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function saveProductItem(access_token, formObj) {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'content-type': 'json'
        },
        data: formObj,
        url: '/api/checkout/orderitem/create/',
    };
    return axios(options)
        .then(response => response.data);
}

export default saveProductItem;
