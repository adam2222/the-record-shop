
import React from 'react'
import {connect} from 'react-redux'
import Album from '../components/album'

const mapStateToProps = state => {
    return {
        selectedAlbum: state.albums.selectedAlbum
    }
}


export default connect(mapStateToProps)(Album);
