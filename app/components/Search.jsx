import React from 'react'
import {Component} from 'react'
import {browserHistory} from 'react-router'

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputValue: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.redirectToHome = this.redirectToHome.bind(this)
  }

  handleChange(event){
    this.setState({
      inputValue: event.target.value
    }, () => {
      const findFilteredAlbums = this.props.findFilteredAlbums;
      const allAlbums = this.props.allAlbums;
      const filteredAlbumsfromState = this.props.filteredAlbums
      const inputValue = this.state.inputValue


      let filtered = allAlbums.filter(album => {
        return (
        album.title.toLowerCase().match(inputValue.toLowerCase()) ||
        album.artist.toLowerCase().match(inputValue.toLowerCase())
      )

      })
      if (filtered) {
        findFilteredAlbums(filtered)
      }
    })
  }

  redirectToHome (event) {
    event.preventDefault()
    browserHistory.push("/home")

  }

  render(){
    return (
        <form className="navbar-form navbar-left" onSubmit={this.redirectToHome}>

          <div className="form-group" onSubmit={this.handleChange}>
            <input className="form-control" id="search" name="search" placeholder="Search Album Title or Artist" onChange={this.handleChange} value={this.state.inputValue}/>
          </div>

        </form>
    )
  }
}

// <button type="submit" className="btn btn-default">Search</button>


import {connect} from 'react-redux'
import {filterAlbums} from '../reducers/AllAlbumsReducer'
// const findAlbums = (allAlbums) => {
//   return {
//     type: 'GET_ALBUMS',
//     allAlbums
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    findFilteredAlbums: filtered => {
      const action = filterAlbums(filtered)
      dispatch(action)
    }
  }
}

export default connect (state => ({
  allAlbums: state.albums.allAlbums,
  filteredAlbums: state.albums.filteredAlbums
}), mapDispatchToProps) (Search)
