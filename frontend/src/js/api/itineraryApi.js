import axios from 'axios';
import qs from 'qs';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function getItineraryList(pageNumber='1', query='') {
    const queryUrl = `?${query}&page=${pageNumber}`;

    return axios.get(`/api/itineraries/${queryUrl}`)
        .then((response) => (response.data));
}

function getFilteredItineraryList(pageNumber='1', query='') {
    const queryUrl = `?${query}&page=${pageNumber}`;

    return axios.get(`/api/itineraries/list/${queryUrl}`)
        .then((response) => (response.data));
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

function updateItinerary(itineraryObj, token, slug) {
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        data: itineraryObj,
        url: `/api/itineraries/${slug}/update`,
    };
    return axios(options)
        .then(response => response.data);
}

function increaseViewsCounter(slug) {
    return axios.put(
        `/api/itineraries/${slug}/views`)
        .then(response => response.data);
}

function addLike(slug, likeObj, token) {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        url: `/api/itineraries/${slug}/like`,
    };
    return axios(options)
        .then(response => response.data);

}


function deleteItinerary(slug, token) {
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        url: `/api/itineraries/${slug}/delete`,
    };
    return axios(options)
        .then(response => response.data);
}

export {
    getItineraryList,
    getFilteredItineraryList,
    getItineraryDetails,
    getCity,
    createCity,
    createItinerary,
    increaseViewsCounter,
    addLike,
    deleteItinerary,
    updateItinerary
};
