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
            <div className="container">
                <Jumbotron className="home-jumbotron">
                    <h2 className="capitalize">Welcome {user && user}</h2>
                    <hr className="my-2" />
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input type="text" name="search" id="search" placeholder="Start Exploring" />
                        </FormGroup>
                        <Button>Go!</Button>
                    </Form>
                </Jumbotron>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.authentication;
    return {
        user
    };
};

const Home = connect(mapStateToProps)(HomeComponent);

export default Home;