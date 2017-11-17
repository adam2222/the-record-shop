import { connect } from 'react-redux'
import Albums from '../components/Albums'
import {filterAlbums} from '../reducers/AllAlbumsReducer'
import {addAlbumToDB} from '../reducers/ShoppingCartReducer'
import {createGuestUser} from '../reducers/GuestReducer'

const mapStateToProps = (state) => {
  const userId = state.auth ? state.auth.id : 'guest'
  const guestId = state.guest.guestUser ? state.guest.guestUser.id : null

  return {
    allAlbums: state.albums.allAlbums,
    filteredAlbums: state.albums.filteredAlbums,
    userId,
    guestId
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    findFilteredAlbums: filtered => {
      const action = filterAlbums(filtered)
      dispatch(action)
    },
    addAlbumToDB,
    createGuestUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums)
