import React from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { addOrUpdateAlbumInDB, getCartFromDB, removeAlbumFromDB } from '../reducers/ShoppingCartReducer'
import ShoppingCart from '../components/ShoppingCart'


const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addOrUpdateAlbum: (user_id, album_id, quantity) => {
            dispatch(addOrUpdateAlbumInDB(user_id, album_id, quantity))
        },
        getCart: (user_id) => dispatch(getCartFromDB(user_id)),
        removeAlbum: (user_id, album_id) => {
            dispatch(removeAlbumFromDB(user_id, album_id))
        }
    }
}

class ShoppingCartContainer extends React.Component {

    constructor (props) {
        super(props)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        this.state = {
            cart: [],
            total: 0
        }
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            cart: nextProps.cart,
            total: nextProps.cart.reduce((accumulator, album) => accumulator += (album.cost * album.shopping_cart_items.quantity), 0)
        })
    }

    handleQuantityChange (album_id, evt) {
        let cart = this.state.cart
        let changedCart = this.state.cart.map(album => {
            if (album.id === album_id) album.shopping_cart_items.quantity = evt.target.value
            return album
        })

        let changedTotal = changedCart.reduce((accumulator, album) => accumulator += (album.cost * album.shopping_cart_items.quantity), 0)

        this.setState({
            cart: changedCart,
            total: changedTotal
        })
    }

    handleRemove (album_id, user_id, evt) {
        let cart = this.state.cart
        let changedCart = this.state.cart.filter(album => album.id !== album_id)
        let changedTotal = changedCart.reduce((accumulator, album) => accumulator += (album.cost * album.shopping_cart_items.quantity), 0)

        this.setState({
            cart: changedCart,
            total: changedTotal
        })

        this.props.removeAlbum(user_id, album_id)
        browserHistory.push(`/${user_id}/cart`)
    }

    render () {
        return (
            <ShoppingCart 
                {...this.props}
                handleQuantityChange = {this.handleQuantityChange}
                handleRemove = {this.handleRemove}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartContainer)