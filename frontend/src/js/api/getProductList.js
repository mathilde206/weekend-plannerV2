import axios from 'axios';

function getProductList() {
    return axios.get('/api/products/')
        .then((response) => (response.data));
}

export default getProductList;
