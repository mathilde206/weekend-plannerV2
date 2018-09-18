import axios from 'axios';

function getUserOrders(token) {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        url: '/api/checkout/user/orders',
    };
    return axios(options)
        .then(response => response.data);
}

export default getUserOrders;
