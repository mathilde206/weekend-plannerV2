import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';

import './ItineraryCard.scss';

//TODO: add the callback

const ItineraryCard = ({
    city,
    image,
    description,
    id,
    photo,
    title,
    slug,
}) => {console.log(slug)
    return (
        <Card
            className="itinerary-card"
        >
            <CardImg
                alt="Card image cap"
                top
                src={image ? image : '/static/images/genericCard.jpg'}
                className="card-image"
            />
            <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardSubtitle>{city}</CardSubtitle>
                <CardText>{description}</CardText>
                <Link to={slug}><Button>Button</Button></Link>
            </CardBody>
        </Card>
    );
};

ItineraryCard.defaultProps = {
    image: '/static/images/genericCard.jpg',
};

ItineraryCard.propTypes = {
    city: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default ItineraryCard;
