import React, { Component } from 'react'
import { Link } from 'react-router'

export default class AllAlbums extends Component {

  render() {
    const filteredAlbums = this.props.filteredAlbums
    const allAlbums = this.props.allAlbums
    const arrayOfAlbums = filteredAlbums[0] ? filteredAlbums : allAlbums

    const renderedAlbums = arrayOfAlbums.map(album => {
      return (
        <div className="col-md-3" key={album.id}>
          <div className="product">
            <div className="image">
              <Link to="/">
                <img src={album.image_front} className="img-responsive" />
              </Link>
            </div>
            <div className="text-center">
              <h3><Link to="/">{album.title}</Link></h3>
              <h4>{album.artist}</h4>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div>
        {renderedAlbums}
      </div>
    )
  }
}


// this.props.allAlbums.length && <h1>{this.props.allAlbums[0].artist}</h1>}
