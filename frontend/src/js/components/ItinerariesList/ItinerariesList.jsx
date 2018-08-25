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
        {itineraries.map(({ city, description, id, image, likes, title, slug, views,  }) => (
            <ItineraryCard
                city={city.name}
                image={image}
                description={description}
                key={slug}
                id={id}
                likes={views}
                title={title}
                slug={slug}
                views={views}
            />
        )
        )}

    </CardColumns>
);

ItinerariesList.propTypes = {
    itineraries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItinerariesList;
