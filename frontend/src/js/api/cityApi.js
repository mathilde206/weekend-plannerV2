import axios from 'axios';
import { authHeader } from '../helpers/authHeader';

export const itineraryService = {
    getCity
};

function getCity(cityName) {
    return axios(`/api/cities/?search=${cityName}`)
        .then(({ data }) => {
            if (data.length > 0 && data[ 0 ].pk) {
                return data[ 0 ];
            }
        });
}

function createCity(cityObj) {
    const header = authHeader();
    console.log(header);
    return axios.post('/api/cities/create/', cityObj, header)
        .then(response => response.data);
}