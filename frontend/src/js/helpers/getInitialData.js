import {
    getItineraryList,
} from '../api';

function getInitialData() {
    return Promise.all([
        getItineraryList()
    ]).then(response => response);
};

export default getInitialData;