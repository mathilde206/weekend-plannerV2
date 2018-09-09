import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    receiveUserItineraryLikes
} from '../../actions';

import {
    addLike,
    refreshAccessToken,
    getUserLikes
} from '../../api';

import {
    accessToken,
    isAccessTokenExpired,
    isAuthenticated,
    refreshToken
} from '../../reducers';

import {
    Button,
} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faThumbsUp,
    faThumbsDown,
    faPencilAlt,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faThumbsUp,
    faThumbsDown,
    faPencilAlt,
    faTrash,
);

class ItineraryDetailsActions extends React.Component {
    handleLikeClick = (event) => {
        const {
            accessToken,
            isAccessTokenExpired,
            refreshToken,
            onLike,
            userId,
            slug,
            dispatch,
        } = this.props;
        event.preventDefault();

        let likeObj = new FormData();
        likeObj.append('likes', userId);

        if (isAccessTokenExpired) {
            refreshAccessToken(refreshToken)
                .then(response => {
                    addLike(slug, likeObj, response.access.token)
                        .then((response) => {
                            dispatch(receiveUserItineraryLikes(response.userLikes));
                            onLike();
                        });
                });
        } else {
            addLike(slug, likeObj, accessToken)
                .then((response) => {
                    dispatch(receiveUserItineraryLikes(response.userLikes));
                    onLike();
                });
        }
    };

    render() {
        const {
            isAuthenticated,
            loggedInUser,
            pk,
            user,
            userId,
            userLikes,
            onDelete,
        } = this.props;

        const isOwner = isAuthenticated && loggedInUser === user.username;
        const isLiked = userLikes.length && userLikes.indexOf(pk) > -1;

        return (
            <p className="lead">
                {
                    (isAuthenticated && !isLiked) &&
                    (<Button
                        color="primary"
                        onClick={this.handleLikeClick}
                    >
                        <FontAwesomeIcon icon="thumbs-up" />
                        &nbsp;Like
                    </Button>)
                }
                {
                    Boolean(isAuthenticated && isLiked) &&
                    (<Button
                        color="primary"
                        onClick={this.handleLikeClick}
                    >
                        <FontAwesomeIcon icon="thumbs-down" />
                        &nbsp;Unlike
                    </Button>)
                }

                {
                    isOwner &&
                    <Button color="primary">
                        <FontAwesomeIcon icon="pencil-alt" />
                        &nbsp;Edit
                    </Button>
                }
                {
                    isOwner &&
                    <Button
                        color="danger"
                        onClick={onDelete}
                    >
                        <FontAwesomeIcon icon="trash" />
                        &nbsp;Delete
                    </Button>
                }

            </p>
        );
    }
}

ItineraryDetailsActions.propTypes = {
    accessToken: PropTypes.string,
    isAccessTokenExpired: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    loggedInUser: PropTypes.string,
    onLike: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    pk: PropTypes.number.isRequired,
    user: PropTypes.objectOf(PropTypes.string),
    userId: PropTypes.number,
    userLikes: PropTypes.arrayOf(PropTypes.number),
    refreshToken: PropTypes.string,
    slug: PropTypes.string.isRequired,
};

ItineraryDetailsActions.defaultProps = {
    accessToken: '',
    isAccessTokenExpired: true,
    isAuthenticated: false,
    loggedInUser: '',
    user: {},
    userId: 0,
    userLikes: [],
    refreshToken: '',
};

const mapStateToProps = (state) => {
    const {
        user,
        userLikes,
    } = state;

    return ({
        accessToken: accessToken(state),
        isAccessTokenExpired: isAccessTokenExpired(state),
        isAuthenticated: isAuthenticated(state),
        loggedInUser: user.user,
        userId: user.userId,
        userLikes: userLikes.itinerary_likes,
        refreshToken: refreshToken(state),
    });
};

export default connect(mapStateToProps)(ItineraryDetailsActions);
