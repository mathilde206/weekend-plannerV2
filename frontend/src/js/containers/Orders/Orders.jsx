import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { Alert } from 'reactstrap';
import { fetchUserOrders } from '../../actions';
import OrderCard from '../OrderCard/OrderCard';

import './Orders.scss';

class Orders extends React.Component {
    render() {
        const {
            orders,
            isFetching,
            fromOrder,
        } = this.props;

        if (isFetching) {
            return (
                <div className="container">
                    <ReactLoading type="bubbles" color="#000c4f" />
                </div>
            );
        }

        return (
            <Fragment>
                <h4 className="order-title">Your Orders</h4>
                {
                    fromOrder &&
                    <Alert color="success">
                        Your order was successfully created. Thank you for your trust!
                    </Alert>
                }
                {orders.map(({
                    pk,
                    creation_date,
                    total,
                }) => <OrderCard
                    key={pk}
                    pk={pk}
                    creationDate={creation_date}
                    total={total}
                />)}
            </Fragment>
        );

    }

    componentDidMount() {
        const {
            dispatch,
        } = this.props;

        dispatch(fetchUserOrders());
    }
};

Orders.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    orders: PropTypes.array,
};

Orders.defaultProps = {
    isFetching: true,
};

const mapStateToProps = ({ userOrders }) => {
    const {
        error,
        isFetching,
        orders,
    } = userOrders;
    return {
        error,
        isFetching,
        orders,
    };
};

export default connect(mapStateToProps)(Orders);
