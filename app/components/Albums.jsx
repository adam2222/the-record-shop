import React, { Component } from 'react'
import { Link } from 'react-router'
import Dropdown from './Dropdown'

export default class AllAlbums extends Component {

  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  componentWillMount() {
    this.setState({
      quantity: 1
    })
  }

  render() {
    const arrayOfAlbums = this.props.filteredAlbums[0] ? this.props.filteredAlbums : this.props.allAlbums

    const renderedAlbums = arrayOfAlbums.map(album => {
      return (
        <div className="col-md-3" key={album.id}>
          <div className="product">
            <div className="image">
              <Link to={`/albums/${album.id}`}>
                <img src={album.image_front} className="img-responsive" />
              </Link>
            </div>
            <div className="text text-center">
              <h3><Link to={`/albums/${album.id}`}>{album.title}</Link></h3>
              <h4>{album.artist}</h4>
            </div>
            <div className="price col-sm-4">
              Price: ${album.cost}
            </div>
            <div className="col-sm-4">
              <Dropdown onChange={this.handleChange} album={album} />
            </div>
            <button type="button" className="col-sm-4 btn btn-success">Add to Cart</button>

          </div>
        </div>
      )
    })

    return (
      <div className="container">
        <div className="row">
         {renderedAlbums}
        </div>
      </div>
    )
  }
}
