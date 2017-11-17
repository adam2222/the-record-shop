
import React from 'react'
import {connect} from 'react-redux'
import Album from '../components/Album'
import { createReview } from '../reducers/AlbumReviewsReducer'
import { addAlbumToDB } from '../reducers/ShoppingCartReducer'
import { createGuestUser } from '../reducers/GuestReducer'

const mapStateToProps = state => {
  const userId = state.auth ? state.auth.id : 'guest'
  const guestId = state.guest.guestUser ? state.guest.guestUser.id : null

    return {
        selectedAlbum: state.albums.selectedAlbum,
        reviews: state.reviews,
        userId,
        guestId
    }
}

const mapDispatchToProps = { createReview, addAlbumToDB, createGuestUser }

export default connect(mapStateToProps, mapDispatchToProps)(Album)
