import React from 'react';
import { connect } from 'react-redux'
import Checkout from '../components/Checkout'

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = state => {
    return {
        
    }
}

export default connect(mapStateToProps)(Checkout)