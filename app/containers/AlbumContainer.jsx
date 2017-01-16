
import React from 'react'
import {connect} from 'react-redux'
import Album from '../components/album'
import { createReview } from '../reducers/AlbumReviewsReducer'

const mapStateToProps = state => {
    return {
        selectedAlbum: state.albums.selectedAlbum,
        reviews: state.reviews
    }
}

const mapDispatchToProps = { createReview }

export default connect(mapStateToProps, mapDispatchToProps)(Album)
