
import React from 'react'
import {connect} from 'react-redux'
import Album from '../components/album'
import { createReview } from '../reducers/AlbumReviewsReducer'
import { addAlbumToDB } from '../reducers/ShoppingCartReducer'

const mapStateToProps = state => {
    return {
        selectedAlbum: state.albums.selectedAlbum,
        reviews: state.reviews
    }
}

const mapDispatchToProps = { createReview, addAlbumToDB }

export default connect(mapStateToProps, mapDispatchToProps)(Album)
