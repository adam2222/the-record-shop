import { connect } from 'react-redux'
import Albums from '../components/Albums'

const mapStateToProps = (state) => {
  return {
    allAlbums: state.albums.allAlbums
  }
}

export default connect(mapStateToProps)(Albums)
