import React from 'react';
import PropTypes from 'prop-types';

import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEuroSign,
} from '@fortawesome/free-solid-svg-icons';


library.add(
    faEuroSign
);

const Payment = (props) => {
    return (<div>Payment</div>);
};


export default Payment;
