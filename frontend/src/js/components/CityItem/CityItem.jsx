import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import './CityItem.scss';

const CityItem = ({ country, currency, handleSelectExistingCity, language, name, pk }) => (
    <Col sm="12" md="4" className="city-item-card">
        <Card body>
            <CardTitle>{name}</CardTitle>
            <CardText>
                Country : {country}
                <br />
                Currency : {currency}
                <br />
                Language : {language}
            </CardText>
            <Button onClick={(event) => handleSelectExistingCity(event, pk)}>Select as City</Button>
        </Card>
    </Col>
);

CityItem.propTypes = {
    country: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    handleSelectExistingCity: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
};

export default CityItem;
