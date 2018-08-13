import axios from 'axios';
import qs from 'qs';

function getItineraryList() {
    return axios.get('/api/itineraries/')
        .then((response) => {
            console.log(response);
        });
}

function getItineraryDetails(slug) {
    return axios.get(`/api/itineraries/${slug}`)
        .then((response) => response.data);
}

function getCity(city) {
    return axios.get(`/api/cities/?search=${city}`)
        .then(({ data }) => {
            const promisesUrls = data.map(city => axios.get(`/api/cities/${city.pk}`));
            return Promise.all(promisesUrls).then(response => response.map(item => item.data));
        }).then(response => response);
};

function createCity(cityObj, token) {
    return axios.post('/api/cities/create/', cityObj, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.data);
}

function createItinerary(itineraryObj, token) {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        data: itineraryObj,
        url: '/api/itineraries/create/',
    };
    return axios(options)
        .then(response => response.data);
}

export {
    getItineraryList,
    getItineraryDetails,
    getCity,
    createCity,
    createItinerary,
};
