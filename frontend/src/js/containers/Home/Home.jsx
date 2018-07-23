import React from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

import './Home.scss';

class HomeComponent extends React.Component {
    render() {
        const {
            user
        } = this.props;

        return (
            <div className="home-container">
                <div className="container">
                    <Jumbotron className="home-jumbotron">
                        <h2 className="capitalize">Welcome {user && user}</h2>
                        <p className="lead">Start planning your next weekend in Europe with 1-3 days trips recommendations. You can also join the community and propose your own itineraries. </p>
                        <hr className="my-2" />
                        <div className="buttons-inline">
                            {
                                user &&
                                <Link to="/create/">
                                    <Button color="primary" className='btn-mg-right'>
                                        Create an Itinerary
                                    </Button>
                                </Link>
                            }

                            <Form inline>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Input type="text" name="search" id="search" placeholder="Start Exploring" />
                                </FormGroup>
                                <Button>Go!</Button>
                            </Form>
                        </div>
                    </Jumbotron>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.user;
    return {
        user
    };
};

const Home = connect(mapStateToProps)(HomeComponent);

export default Home;