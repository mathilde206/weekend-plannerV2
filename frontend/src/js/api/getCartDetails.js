import axios from 'axios/index';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function getCartDetails(cart) {
    return axios.all(
        cart.map(item => getProductDetail(item))
    ).then(response => response);
}

export default getCartDetails;
