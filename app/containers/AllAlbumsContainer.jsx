import { connect } from 'react-redux'
import Albums from '../components/Albums'

const mapStateToProps = (state) => {
  console.log('this is state', state)
  return {
    allAlbums: state.albums
  }
}

export default connect(mapStateToProps)(Albums)
