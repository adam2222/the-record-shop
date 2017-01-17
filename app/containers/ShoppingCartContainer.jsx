import React from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { getCartFromDB, removeAlbumFromDB, removeAllAlbumsFromDB, updateQuantityInDB } from '../reducers/ShoppingCartReducer'
import ShoppingCart from '../components/ShoppingCart'


const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCart: (user_id) => dispatch(getCartFromDB(user_id)),
        removeAlbum: (user_id, album_id) => dispatch(removeAlbumFromDB(user_id, album_id)),
        removeAllAlbums: user_id => dispatch(removeAllAlbumsFromDB(user_id)),
        updateQuantity: (user_id, album_id, quantity) => dispatch(updateQuantityInDB(user_id, album_id, quantity))
    }
}

class ShoppingCartContainer extends React.Component {

    constructor (props) {
        super(props)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleRemoveAll = this.handleRemoveAll.bind(this)

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

    handleQuantityChange (album_id, user_id, evt) {
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

        this.props.updateQuantity(user_id, album_id, evt.target.value)
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

    handleRemoveAll (user_id, evt) {
        this.setState({
            cart: [],
            total: 0
        })

        this.props.removeAllAlbums(user_id)
    }

    render () {
        return (
            <ShoppingCart 
                total = {this.state.total}
                {...this.props}
                handleQuantityChange = {this.handleQuantityChange}
                handleRemove = {this.handleRemove}
                handleRemoveAll = {this.handleRemoveAll}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartContainer)