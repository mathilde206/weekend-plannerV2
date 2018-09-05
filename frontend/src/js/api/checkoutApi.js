import axios from 'axios';
import qs from 'qs';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function getProductList() {
    return axios.get('/api/products/')
        .then((response) => (response.data));
}

function getProductDetail(productId) {
    return axios.get(`/api/products/${productId}/`)
        .then((response) => (response.data));
}

function getCartDetails(cart) {
    return axios.all(
        cart.map(item => getProductDetail(item))
    ).then(response => response);
}

function getStripePublishableKey(token) {
    return axios.get('/api/checkout/token/', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.data);
}

function saveOrder(access_token, stripe_token, formObj) {
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

export {
    getProductList,
    getCartDetails,
    getStripePublishableKey,
    saveOrder,
    saveProductItem,
};
