import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { Redirect } from 'react-router-dom';

import {
    Button,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faMapMarkerAlt,
    faGlobe,
    faBook,
    faBirthdayCake,
} from '@fortawesome/free-solid-svg-icons';

import './ProfileInfoTileEdit.scss';

library.add(
    faUser,
    faMapMarkerAlt,
    faGlobe,
    faBook,
    faBirthdayCake,
);

const ProfileInfoTileEdit = ({
    bio,
    birth_date,
    userLocation,
    onFieldChange,
    onSubmit,
    profileUpdate,
    url,
    username,
    website,
}) => {
    const {
        updating,
        updated,
    } = profileUpdate;

    if (updating) {
        return (
            <div className="container">
                <ReactLoading type="bubbles" color="#000c4f" />
            </div>
        );
    }

    if (updated) {
        return (
            <Redirect to={url} />
        );
    }

    return (
        <Form className="form-wrapper">
            <FormGroup row>
                <Label for="username" sm={2}>
                    <FontAwesomeIcon icon="user" /> Username
                </Label>
                <Col sm={10}>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder={username}
                        disabled
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="userLocation" sm={2}>
                    <FontAwesomeIcon icon="map-marker-alt" /> Location
                </Label>
                <Col sm={10}>
                    <Input
                        type="text"
                        name="userLocation"
                        id="userLocation"
                        onChange={(event) => onFieldChange('userLocation', event)}
                        placeholder={userLocation}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="birth_date" sm={2}>
                    <FontAwesomeIcon icon="birthday-cake" /> Birth Date
                </Label>
                <Col sm={10}>
                    <Input
                        type="date"
                        name="birth_date"
                        id="birth_date"
                        onChange={(event) => onFieldChange('birth_date', event)}
                        placeholder={birth_date}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="website" sm={2}>
                    <FontAwesomeIcon icon="globe" /> Website
                </Label>
                <Col sm={10}>
                    <Input
                        type="text"
                        name="website"
                        id="website"
                        onChange={(event) => onFieldChange('website', event)}
                        placeholder={website}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="bio" sm={2}>
                    <FontAwesomeIcon icon="book" /> Bio
                </Label>
                <Col sm={10}>
                    <Input
                        type="textarea"
                        name="bio"
                        id="bio"
                        onChange={(event) => onFieldChange('bio', event)}
                        placeholder={bio}
                    />
                </Col>
            </FormGroup>
            <Button onClick={onSubmit}>Submit</Button>
        </Form>
    );
};

ProfileInfoTileEdit.propTypes = {
    bio: PropTypes.string,
    birth_date: PropTypes.string,
    userLocation: PropTypes.string,
    onFieldChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    username: PropTypes.string,
    website: PropTypes.string,
};

ProfileInfoTileEdit.defaultProps = {
    bio: '',
    birth_date: '',
    userLocation: '',
    profileUpdate: {},
    username: '',
    website: '',
};

export default ProfileInfoTileEdit;
