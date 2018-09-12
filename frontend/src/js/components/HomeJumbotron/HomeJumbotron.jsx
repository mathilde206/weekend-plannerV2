import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Jumbotron, Button, Form, FormGroup, Input } from 'reactstrap';

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
                <div className="buttons-inline">
                    {
                        isAuthenticated &&
                            <Link to="/create/">
                                <Button color="primary" className="btn-mg-right">
                                    Create an Itinerary
                                </Button>
                            </Link>
                    }

                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input
                                onChange={this.handleSearchChange}
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Start Exploring"
                            />
                        </FormGroup>
                        <Button onClick={this.handleSubmit}>Go!</Button>
                    </Form>
                </div>
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
