import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

import {
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    UncontrolledCollapse,
} from 'reactstrap';
import { getOrderDetails } from '../../api';

import './OrderCard.scss';

class OrderCard extends React.Component {
    state = {
        isLoading: true,
        error: '',
        orderItems: [],
    };

    componentDidMount() {
        const { pk } = this.props;
        getOrderDetails(pk)
            .then(({ order_items }) => {
                console.log(order_items)
                this.setState({
                    isLoading: false,
                    orderItems: order_items,
                });
            })
            .catch((error) => {
                this.setState({
                    error,
                    isLoading:false,
                });
            });
    }

    render() {
        const {
            error,
            isLoading,
            orderItems,
        } = this.state;

        const {
            creationDate,
            pk,
            total,
        } = this.props;

        let content;

        if (isLoading) {
            content = (
                <ReactLoading type="spinningBubbles" color="#000c4f" />
            );
        } else if (orderItems.length) {
            content = orderItems.map(({ name, type, price }) => (
                <div className="order-item-wrapper">
                    <span>{name} - {type}</span>
                    <span>{price} EUR</span>
                </div>
            ));
        } else {
            content = (
                <span className="error-order">
                    We couldn't load the content of this order, we are sorry. Please try again later.
                </span>
            );
        }

        return (
            <div>
                <ListGroupItem id={`order-${creationDate}-${pk}`} className="order-card-wrapper">
                    <ListGroupItemHeading className="header-wrapper">
                        <span className="header-title">Date: {creationDate}</span><span>Total: {total} EUR</span>
                    </ListGroupItemHeading>
                    <UncontrolledCollapse toggler={`#order-${creationDate}-${pk}`}>
                        <div className="order-content">
                            {content}
                        </div>
                    </UncontrolledCollapse>
                </ListGroupItem>
            </div>);
    }
}

OrderCard.propTypes = {
    pk: PropTypes.number.isRequired,
    creationDate: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
};

export default OrderCard;