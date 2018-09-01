import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SaleConfirmCart from '../SaleConfirmCart/SaleConfirmCart';
import { getCartDetails } from '../../api';

class SalePage extends React.Component {
    state = {
        billingAddressLine1: '',
        billingAddressLine2: '',
        billingPostCode: '',
        billingState: '',
        billingCity: '',
        billingCountry: '',
        orders: [],
        total: null,
    };

    componentWillMount() {
        const { cart } = this.props;

        getCartDetails(cart)
            .then((response) => {
                const total = response.map(item => parseInt(item.price)).reduce((a, b) => a + b, 0);
                this.setState({
                    orders: response,
                    total,
                });
            });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.cart !== this.props.cart) {
            getCartDetails(nextProps.cart)
                .then((response) => {
                    const total = response.map(item => parseInt(item.price)).reduce((a, b) => a + b, 0);
                    this.setState({
                        orders: response,
                        total,
                    });
                });
        }
    }

    render() {
        const { orders, total } = this.state;
        const { removeFromCart } = this.props;

        return (
            <BrowserRouter>
                <Switch>
                    <Route render={(props) => (
                        <SaleConfirmCart
                            {...props}
                            orders={orders}
                            total={total}
                            removeFromCart={removeFromCart}
                        />
                    )} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default SalePage;
