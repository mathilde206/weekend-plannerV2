import React from 'react';
import PropTypes from 'prop-types';

import {
    CardColumns,
    Col,
    Row
} from 'reactstrap';

import ItineraryCard from '../ItineraryCard/ItineraryCard';

const ItinerariesList = ({ itineraries }) => (
    <CardColumns>
        {itineraries.map(({ city, description, id, image, title, slug }) => (
            <ItineraryCard
                city={city.name}
                image={image}
                description={description}
                id={id}
                title={title}
                slug={slug}
            />
        )
        )}

    </CardColumns>
);

ItinerariesList.propTypes = {
    itineraries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItinerariesList;
