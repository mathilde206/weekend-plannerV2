import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    CardColumns,
    Col,
    Row
} from 'reactstrap';

import { getItineraryList } from '../../api';

import ItineraryCard from '../ItineraryCard/ItineraryCard';
import Paginator from '../Paginator/Paginator';

const ItinerariesList = ({
    count,
    itineraries,
    navigation,
    requestItinerariesList,
    receiveItinerariesList,
    total_pages,
}) => {

    const handlePageClick = (page) => {
        requestItinerariesList();
        getItineraryList(page)
            .then((data) => {
                receiveItinerariesList(data);
            });
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
                        likes={views}
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
    requestItinerariesList: PropTypes.func.isRequired,
    receiveItinerariesList: PropTypes.func.isRequired,
    total_pages: PropTypes.number.isRequired,
};

export default ItinerariesList;
