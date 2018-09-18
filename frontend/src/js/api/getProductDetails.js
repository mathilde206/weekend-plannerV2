import axios from 'axios/index';

function getProductDetail(productId) {
    return axios.get(`/api/products/${productId}/`)
        .then((response) => (response.data));
}

export default getProductDetail;
