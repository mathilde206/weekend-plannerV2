import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Jumbotron, Button, Col, Input, Row } from 'reactstrap';

import './HomeJumbotron.scss';

class HomeJumbotron extends React.Component {
    state = {
        searchQuery: '',
    };

    handleSearchChange = ({ target }) => {
        const {
            value
        } = target;

        this.setState({
            searchQuery: value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { searchQuery } = this.state;
        const { onFetchItineraries } = this.props;

        const query = `search=${searchQuery}`;

        if (searchQuery) {
            onFetchItineraries(1, query);
        }
    };

    render() {
        const {
            isAuthenticated,
            user,
            withQuery,
        } = this.props;

        if (withQuery) {
            return (
                <Redirect to="/explore/" />
            );
        }

        return (<div className="container">
            <Jumbotron className="home-jumbotron">
                <h2 className="capitalize">Welcome {user ? user : ''}</h2>
                <p className="lead">Start planning your next weekend in Europe with 1-3 days trips recommendations. You can also join the community and propose your own itineraries. </p>
                <hr className="my-2" />
                <Row>
                    <Col xs="5" md="3" className="home-actions">
                        <Input
                            onChange={this.handleSearchChange}
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Start Exploring"
                            className=""
                        />
                    </Col>
                    <Col xs="5" md="3" className="home-actions">
                        <Button onClick={this.handleSubmit}>Go!</Button>
                    </Col>
                    {
                        isAuthenticated &&
                            <Col xs="12" md={{ size: 3, offset: 3 }} className="home-actions">
                                <Link to="/create/">
                                    <Button color="primary" className="btn-mg-right">
                                        Create an Itinerary
                                    </Button>
                                </Link>
                            </Col>
                    }
                </Row>
            </Jumbotron>
        </div>
        );
    }
}

HomeJumbotron.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
};

export default HomeJumbotron;
