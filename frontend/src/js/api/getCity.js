import axios from 'axios/index';

function getCity(city) {
    return axios.get(`/api/cities/?search=${city}`)
        .then(({ data }) => {
            const promisesUrls = data.map(city => axios.get(`/api/cities/${city.pk}`));
            return Promise.all(promisesUrls).then(response => response.map(item => item.data));
        }).then(response => response)
        .catch(error => error.message.data);
};

export default getCity;
