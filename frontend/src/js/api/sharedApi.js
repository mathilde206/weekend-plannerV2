import axios from 'axios';
import itineraryApi from './itineraryApi';

export function getInitialData() {
    return Promise.all([
        itineraryApi.getItineraryList()
    ]).then(response => response);
}
