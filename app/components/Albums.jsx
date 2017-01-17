import React, { Component } from 'react'
import { Link } from 'react-router'
import Dropdown from './Dropdown'
import store from '../store'

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

  componentDidMount() {
    if (this.props.params.genre) {
      const filteredAlbums = this.props.filteredAlbums
      const allAlbums = this.props.allAlbums
      let filtered = allAlbums.filter(album => {
        return (
          album.genre.toLowerCase().match(this.props.params.genre.toLowerCase())
        )})
      this.props.findFilteredAlbums(filtered)
    }
  }

  render() {
    const addAlbumToDB = this.props.addAlbumToDB
    const filteredAlbums = this.props.filteredAlbums
    const allAlbums = this.props.allAlbums
    const userId = this.props.userId
    const quantity = this.state.quantity
    const arrayOfAlbums = filteredAlbums[0] ? filteredAlbums : allAlbums

    const renderedAlbums = arrayOfAlbums.map(album => {
      return (
        <div className="col-lg-3 col-md-4 col-sm-6 album" key={album.id}>
          <div className="product">
            <div className="image">
              <Link to={`/albums/${album.id}`}>
                <img src={`../${album.image_front}`} className="img-responsive" />
              </Link>
            </div>
            <div className="text text-center">
              <h3><Link to={`/albums/${album.id}`}>{album.title}</Link></h3>
              <h4>{album.artist}</h4>
            </div>

            <div className="info">
            <div className="price col-sm-4">
              Price: ${album.cost}
            </div>
            <div className="col-sm-3">
              <Dropdown onChange={this.handleChange} album={album} />
            </div>
            <button type="button" className="col-sm-5 btn btn-success" onClick={() => {
                  return store.dispatch(addAlbumToDB(userId, album.id, this.state.quantity))
              }}>Add to Cart</button>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="row">
         {renderedAlbums}
      </div>
    )
  }
}
