import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { likeItinerary } from '../../actions';
import { isAuthenticated } from '../../reducers';

import { Button } from 'reactstrap';

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
            onLike,
            slug,
            dispatch,
        } = this.props;
        event.preventDefault();

        dispatch(likeItinerary(slug));
    };

    render() {
        const {
            isAuthenticated,
            loggedInUser,
            pk,
            onDelete,
            slug,
            user,
            userLikes,
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
                    <Link to={`${slug}/update`}>
                        <Button color="primary">
                            <FontAwesomeIcon icon="pencil-alt" />
                            &nbsp;Edit
                        </Button>
                    </Link>
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
    isAuthenticated: PropTypes.bool,
    loggedInUser: PropTypes.string,
    onLike: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    pk: PropTypes.number.isRequired,
    user: PropTypes.objectOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])).isRequired,
    userId: PropTypes.number,
    userLikes: PropTypes.arrayOf(PropTypes.number),
    slug: PropTypes.string.isRequired,
};

ItineraryDetailsActions.defaultProps = {
    loggedInUser: '',
    user: {},
    userId: 0,
    userLikes: [],
};

const mapStateToProps = (state) => {
    const {
        user,
        userLikes,
    } = state;

    return ({
        isAuthenticated: isAuthenticated(state),
        loggedInUser: user.user,
        userId: user.id,
        userLikes: userLikes.itinerary_likes,
    });
};

export default connect(mapStateToProps)(ItineraryDetailsActions);
