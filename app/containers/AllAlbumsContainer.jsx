import { connect } from 'react-redux'
import Albums from '../components/Albums'

const mapStateToProps = (state) => {
  const userId = state.auth ? state.auth.id : 'guest'
  
  return {
    allAlbums: state.albums.allAlbums,
    filteredAlbums: state.albums.filteredAlbums,
    userId
  }
}

import {filterAlbums} from '../reducers/AllAlbumsReducer'
import {addAlbumToDB} from '../reducers/ShoppingCartReducer'

const mapDispatchToProps = (dispatch) => {
  return {
    findFilteredAlbums: filtered => {
      const action = filterAlbums(filtered)
      dispatch(action)
    },
    addAlbumToDB
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums)
