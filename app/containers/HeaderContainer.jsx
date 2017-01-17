import Header from '../components/Header';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {

  };
};

import {filterAlbums} from '../reducers/AllAlbumsReducer'

const mapDispatchToProps = (dispatch) => {
  return {
    findFilteredAlbums: filtered => {
      const action = filterAlbums(filtered)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

// export default connect(mapStateToProps)(Header);
