import axios from 'axios/index';

function getItineraryDetails(slug) {
    return axios.get(`/api/itineraries/${slug}`)
        .then((response) => response.data);
};

export default getItineraryDetails;
