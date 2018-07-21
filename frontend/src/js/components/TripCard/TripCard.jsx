import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

//TODO: add the callback

const TripCard = ({
    city,
    description,
    id,
    photo,
    title,
}) => {
    return (
        <div>
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBody>
                    <CardTitle>{title}</CardTitle>
                    <CardSubtitle>{city}</CardSubtitle>
                    <CardText>{description}</CardText>
                    <Button>Button</Button>
                </CardBody>
            </Card>
        </div>
    );
};

TripCard.defaultProps = {
    photo: '',
};

TripCard.propTypes = {
    city: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    photo: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default TripCard;