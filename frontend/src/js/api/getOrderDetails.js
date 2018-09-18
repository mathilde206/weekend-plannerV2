import axios from 'axios/index';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function getOrderDetails(orderPk) {
    return axios.get(`/api/checkout/order/${orderPk}/items`)
        .then(response => response.data);
};

export default getOrderDetails;
