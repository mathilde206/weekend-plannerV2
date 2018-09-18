import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

import { updateProfile } from '../../actions';
import { getUserProfile } from '../../api';
import { isAuthenticated } from '../../reducers';

import { ProfileInfoTile, ProfileInfoTileEdit } from '../../components';
import Orders from '../Orders/Orders';

import './ProfilePage.scss';

const NavProfile = ({ children, to, exact }) => {
    return (
        <Route path={to} exact={exact} children={({ match }) => (console.log(match) ||
            <div className={match ? 'nav-link-profile nav-link-active' : 'nav-link-profile'}>
                <Link to={to}>
                    {children}
                </Link>
            </div>
        )}
        />
    );
};

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
        const {
            bio,
            birth_date,
            location,
            website,
        } = this.state;

        const {
            dispatch,
            match,
        } = this.props;

        const {
            params
        } = match;

        event.preventDefault();

        let formObj = new FormData;
        formObj.append('user', params.userId);
        formObj.append('bio', bio);
        formObj.append('birth_date', birth_date);
        formObj.append('location', location);
        formObj.append('website', website);

        dispatch(updateProfile(formObj));
    };

    handleFieldchange = (field, event) => {
        this.setState({
            [ field ]: event.target.value,
        });
    };

    componentDidMount() {
        const { username } = this.state;
        const {
            dispatch,
            match,
            loggedInUser,
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
            location,
            username,
            website,
        } = this.state;

        const {
            dispatch,
            loggedInUser,
            match,
            profileUpdate,
        } = this.props;

        if (isLoading) {
            return (
                <div className="container">
                    <ReactLoading type="bubbles" color="#000c4f" />
                </div>
            );
        }

        const isOwner = loggedInUser === username;
        return (
            <div className="container profile-container">
                <h1 className="display-3 text-capitalize">{username}'s Profile</h1>
                <hr className="my-2" />
                {
                    (isAuthenticated && isOwner) &&
                    <div className="profile-nav">
                        <NavProfile
                            exact
                            to={`${match.url}`}>
                            Profile
                        </NavProfile>
                        <NavProfile
                            to={`${match.url}/edit`}
                        >
                            Edit
                        </NavProfile>

                        <NavProfile
                            to={`${match.url}/orders`}
                        >
                            Orders
                        </NavProfile>
                    </div>
                }
                <Switch>
                    <Route
                        path={`${match.path}/edit`}
                        render={() => (
                            <ProfileInfoTileEdit
                                bio={bio}
                                birth_date={birth_date}
                                location={location}
                                onSubmit={this.handleSubmit}
                                onFieldChange={this.handleFieldchange}
                                profileUpdate={profileUpdate}
                                url={match.url}
                                username={username}
                                website={website}
                            />)
                        }
                    />
                    <Route path={`${match.path}/orders`} component={Orders} />
                    <Route
                        render={() => (
                            <ProfileInfoTile
                                bio={bio}
                                birth_date={birth_date}
                                dispatch={dispatch}
                                location={location}
                                username={username}
                                website={website}
                            />
                        )
                        }
                    />
                </Switch>
            </div>);

    }
}

ProfilePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loggedInUser: PropTypes.string,
    profileUpdate: PropTypes.object,
};

ProfilePage.defaultProps = {
    isAuthenticated: false,
    loggedInUser: '',
    profileUpdate: {},
};

const mapStateToProps = (state) => {
    const {
        user,
        profileUpdate,
    } = state;

    return ({
        isAuthenticated: isAuthenticated(state),
        loggedInUser: user.user,
        profileUpdate,
    });
};

export default connect(mapStateToProps)(ProfilePage);
