import React, { Component } from 'react'
import Dropdown from './Dropdown'
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'
import Stars from './Stars'
import store from '../store'

export default class SingleAlbum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      hover: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }
  onClick() {
    this.setState({
      edit: !this.state.edit
    })
  }

  mouseOver() {
    this.setState({
      hover: true
    })
  }

  mouseOut() {
    this.setState({
      hover: false
    })
  }

  handleChange(albumId, event) {
    this.setState({
      [albumId]: event.target.value
    })
  }

  addToCart(albumId, event) {
    event.stopPropagation()
    const addAlbumToDB = this.props.addAlbumToDB
    const userId = this.props.userId
    const guestId = this.props.guestId
    const createGuestUser = this.props.createGuestUser
    const quantity = this.state[albumId] ? this.state[albumId] : 1

    if (userId == 'guest' && !guestId) {
      store.dispatch(createGuestUser(albumId, quantity))
    } else {
      let currentUserId = userId === 'guest' ? guestId : userId
      return store.dispatch(addAlbumToDB(currentUserId, albumId, quantity))
    }
  }


  onFormSubmit(event, reviewRating) {
    const { createReview, selectedAlbum } = this.props
    let reviewInfo = {
      description: event.target.description.value,
      stars: +reviewRating
    }
    createReview(+selectedAlbum.id, reviewInfo)
  }

  componentWillMount() {
    this.setState({
      quantity: 1
    })
  }

  render() {
    const album = this.props.selectedAlbum

    return (
      <div className="container single-album">
        <div className="row">
          <div className="col-md-6">
            <div className="image" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
              <img src={ this.state.hover ? (`../${album.image_back}`) : (`../${album.image_front}`) } className="img-responsive" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="text text-center">
              <h3>{album.title}</h3>
              <h4>{album.artist}</h4>
              { this.props.selectedAlbum.rating && <Stars rating={this.props.selectedAlbum.rating} /> }
              <small>{ this.props.reviews.length } reviews</small>
              <hr />
              <p>{album.description}</p>
            </div>
            <div className="row">
              <div className="price col-sm-4">
                Price: ${album.cost}
              </div>
              <div className="col-sm-4">
                <span>Quantity: </span><Dropdown onChange={(e) => this.handleChange(album.id, e)} album={album} />
              </div>
              <div className="col-sm-4">
                <button type="button" className="col-sm-4 btn btn-success add-to-cart-btn" onClick={(event) => this.addToCart(album.id, event)}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-centered">
            <div className="text-center">
              <h2> Customer Reviews </h2>
              <div className="review-form">
                <div id="review-button">
                  <button type="button" className="btn btn-info" onClick={this.onClick}>Write a Review</button>
                </div>
                {this.state.edit && <ReviewForm onSubmit={ this.onFormSubmit } />}
              </div>
              <hr />
              <ReviewList reviews={this.props.reviews} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


// <span value="1" className="glyphicon glyphicon-star" ></span>
//

