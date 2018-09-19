import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    CardColumns,
    Col,
    Row
} from 'reactstrap';


import ItineraryCard from '../ItineraryCard/ItineraryCard';
import Paginator from '../Paginator/Paginator';

const ItinerariesList = ({
    count,
    itineraries,
    navigation,
    onFetchItineraries,
    total_pages,
}) => {
    const handlePageClick = (page) => {
        onFetchItineraries(page);
    };

    return (
        <Fragment>
            <Paginator
                total_pages={total_pages}
                previous={navigation.previous}
                next={navigation.next}
                handlePageClick={handlePageClick}
            />
            <CardColumns>
                {itineraries.map(({ city, description, id, image, likes, title, slug, views, }) => (
                    <ItineraryCard
                        city={city.name}
                        image={image}
                        description={description}
                        key={slug}
                        id={id}
                        likes={likes.length}
                        title={title}
                        slug={slug}
                        views={views}
                    />
                )
                )}

            </CardColumns>
        </Fragment>
    );
};

ItinerariesList.propTypes = {
    count: PropTypes.number.isRequired,
    itineraries: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigation: PropTypes.shape({
        next: PropTypes.number,
        previous: PropTypes.number,
    }),
    onFetchItineraries: PropTypes.func.isRequired,
    total_pages: PropTypes.number.isRequired,
};

export default ItinerariesList;
