import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserProfile } from '../../api';
import { isAuthenticated } from '../../reducers';

import {
    Jumbotron,
    Button,
    Row,
    Col
} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { ProfileInfoTile, ProfileInfoTileEdit } from '../../components';
import './ProfilePage.scss';

library.add(
    faPencilAlt,
    faTrash,
);

class ProfilePage extends React.Component {
    state = {
        username: '',
        bio: '',
        birth_date: '',
        isLoading: true,
        isEditing: false,
        location: '',
        website: '',
    };

    handleClick = (event) => {
        event.preventDefault();

        this.setState({
            isEditing: !this.state.isEditing
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

    };

    handleFieldchange = (field, event) => {
        this.setState({
            [ field ]: event.target.value,
        });
    };

    componentWillMount() {
        const {
            match
        } = this.props;

        const {
            params
        } = match;

        getUserProfile(params.userId)
            .then(({ user, bio, birth_date, location, website }) => {
                const {
                    username,
                } = user;

                this.setState({
                    username,
                    bio,
                    birth_date,
                    isLoading: false,
                    location,
                    website,
                });
            });
    }

    render() {
        const {
            birth_date,
            bio,
            isLoading,
            isEditing,
            location,
            username,
            website,
        } = this.state;

        const {
            loggedInUser
        } = this.props;

        if (isLoading) {
            return <h1>Loading...</h1>;
        }

        const isOwner = loggedInUser === username;
        return (
            <div className="container profile-container">
                <Jumbotron className="profile-jumbotron">
                    <h2 className="display-3 text-capitalize">{username}'s Profile</h2>
                    <hr className="my-2" />
                    <Row>
                        <Col xs={{ size: 2, offset: 10 }}>
                            <p className="lead">
                                {
                                    (isAuthenticated && isOwner) &&
                                    (<Button
                                        color={isEditing ? 'warning' : 'primary'}
                                        onClick={this.handleClick}
                                    >
                                        <FontAwesomeIcon icon="pencil-alt" />
                                        &nbsp;
                                        {
                                            isEditing ?
                                                'Cancel' :
                                                'Edit'
                                        }
                                    </Button>)
                                }
                            </p>
                        </Col>
                    </Row>
                </Jumbotron>

                {
                    isEditing ?
                        <ProfileInfoTileEdit
                            bio={bio}
                            birth_date={birth_date}
                            location={location}
                            onSubmit={this.handleSubmit}
                            onFieldChange={this.handleFieldchange}
                            username={username}
                            website={website}
                        /> :
                        <ProfileInfoTile
                            bio={bio}
                            birth_date={birth_date}
                            location={location}
                            username={username}
                            website={website}
                        />
                }

            </div>
        );
    }
}

ProfilePage.propTypes = {
    isAuthenticated: PropTypes.bool,
    loggedInUser: PropTypes.string,
};

ProfilePage.defaultProps = {
    isAuthenticated: false,
    loggedInUser: '',
};

const mapStateToProps = (state) => {
    const {
        user,
    } = state;

    return ({
        isAuthenticated: isAuthenticated(state),
        loggedInUser: user.user,
    });
};

export default connect(mapStateToProps)(ProfilePage);
