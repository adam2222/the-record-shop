import React from 'react';
import { connect } from 'react-redux';
import { addOrUpdateAlbumInDB, removeAlbumFromDB } from '../reducers/ShoppingCartReducer'
import ShoppingCart from '../components/ShoppingCart'


const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        allAlbums: state.albums.allAlbums
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addOrUpdateAlbum: (user_id, album_id, quantity) => {
            dispatch(addOrUpdateAlbumInDB(user_id, album_id, quantity))
        },
        removeAlbum: (album_id) => {
            dispatch(removeAlbumFromDB(user_id, album_id))
        }
    }
}

export default connect(mapStateToProps)(ShoppingCart)