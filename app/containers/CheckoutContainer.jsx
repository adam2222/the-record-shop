import React from 'react';
import { connect } from 'react-redux'
import Checkout from '../components/Checkout'
import { makeNewOrder } from '../reducers/OrdersReducer'

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = { makeNewOrder }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

