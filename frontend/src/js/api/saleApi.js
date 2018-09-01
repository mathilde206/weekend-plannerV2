import axios from 'axios';
import qs from 'qs';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function getProductList() {
    return axios.get('/api/products/')
        .then((response) => (response.data));
}
export {
    getProductList
};
