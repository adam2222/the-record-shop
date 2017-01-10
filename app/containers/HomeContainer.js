import Home from '../components/Home';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    selectedAlbum: state.albums.selected
  };
};

export default connect(mapStateToProps)(Home);
