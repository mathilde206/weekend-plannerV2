import axios from 'axios';
import { authHeader } from '../helpers/authHeader';

export default {
    getItineraryList,
    getCity,
    createCity,
};

function getItineraryList() {
    return axios.get('/api/itineraries/')
        .then((response) => {
            console.log(response);
        });
}

function getCity(city) {
    return axios.get(`/api/cities/?search=${city}`)
        .then((response) => response.data);
}

function createCity(cityObj) {
    const header = authHeader();
    return axios.post('/api/cities/create/', cityObj, { headers: header })
        .then(response => response.data);
}