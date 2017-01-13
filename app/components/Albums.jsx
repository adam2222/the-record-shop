import React, { Component } from 'react'
import { Link } from 'react-router'

export default class AllAlbums extends Component {

  render() {

    const arrayOfAllAlbums = this.props.allAlbums.map(album => {
      return (
        <div className="col-md-3" key={album.id}>
          <div className="product">
            <div className="image">
              <Link to={`/albums/${album.id}`}>
                <img src={album.image_front} className="img-responsive" />
              </Link>
            </div>
            <div className="text-center">
              <h3><Link to={`/albums/${album.id}`}>{album.title}</Link></h3>
              <h4>{album.artist}</h4>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="container">
        <div className="row">
          {arrayOfAllAlbums}
        </div>
      </div>
    )
  }
}
