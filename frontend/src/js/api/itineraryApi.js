import axios from 'axios';
import qs from 'qs';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function getItineraryList(pageNumber='1', search='') {
    const query = `?page=${pageNumber}&search=${search}`;

    return axios.get(`/api/itineraries/${query}`)
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

export {
    getItineraryList,
    getItineraryDetails,
    getCity,
    createCity,
    createItinerary,
    increaseViewsCounter,
    addLike,
};
