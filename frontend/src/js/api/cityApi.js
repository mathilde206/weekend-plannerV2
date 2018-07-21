import axios from 'axios';

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