import React from 'react';
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
        removeAlbum: (album_id) => {
            dispatch(removeAlbumFromDB(user_id, album_id))
        }
    }
}

class ShoppingCartContainer extends React.Component {

    constructor (props) {
        super(props)
        this.state = {}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (evt, id) {
        this.setState({
            [id]: evt.target.value
        })
        console.log(this.state)
    }

    componentDidMount () {
        this.props.cart.map(album => {
            this.setState({
                [album.id]: album.quantity_ordered
            })
        })
    }

    render () {
        return (
            <ShoppingCart 
                {...this.props}
                handleChange = {this.handleChange}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartContainer)