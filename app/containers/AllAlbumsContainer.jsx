import { connect } from 'react-redux'
import Albums from '../components/Albums'

const mapStateToProps = (state) => {
  return {
    allAlbums: state.albums.allAlbums,
    filteredAlbums: state.albums.filteredAlbums
  }
}

import {filterAlbums} from '../reducers/AllAlbumsReducer'

const mapDispatchToProps = (dispatch) => {
  return {
    findFilteredAlbums: filtered => {
      const action = filterAlbums(filtered)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums)
