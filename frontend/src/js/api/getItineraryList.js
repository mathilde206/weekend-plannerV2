import axios from 'axios/index';

function getItineraryList(pageNumber='1', query='') {
    const queryUrl = `?${query}&page=${pageNumber}`;

    return axios.get(`/api/itineraries/${queryUrl}`)
        .then((response) => (response.data));
}


function getFilteredItineraryList(pageNumber='1', query='') {
    const queryUrl = `?page=${pageNumber}&${query}`;

    return axios.get(`/api/itineraries/list/${queryUrl}`)
        .then((response) => (response.data));
}

export {
    getItineraryList,
    getFilteredItineraryList,
};
