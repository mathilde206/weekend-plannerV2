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

export {
    getProductList,
    getCartDetails,
};
