import React, { Component } from 'react'
import Dropdown from './Dropdown'
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'

export default class SingleAlbum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      edit: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  onClick() {
    this.setState({
      edit: !this.state.edit
    })
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
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
    const averageRating = []
    if (this.props.selectedAlbum.rating) {
      for (let i = 1; i <= this.props.selectedAlbum.rating; i++) {
        averageRating.push(
          <span key={ i } className="glyphicon glyphicon-star" style={{color: 'yellow'}} />
        )
      }
    }

    return (
      <div className="container single-album">
        <div className="row">
          <div className="col-md-6">
            <div className="image">
              <img src={`../${album.image_front}`} className="img-responsive" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="text text-center">
              <h3>{album.title}</h3>
              <h4>{album.artist}</h4>
              { this.props.selectedAlbum.rating && <h2>{ averageRating }</h2> }
              <small>{ this.props.reviews.length } reviews</small>
              <hr />
              <p>{album.description}</p>
            </div>
            <div className="row">
              <div className="price col-sm-4">
                Price: ${album.cost}
              </div>
              <div className="col-sm-4">
                <Dropdown onChange={this.handleChange} album={album} />
              </div>
              <div className="col-sm-4">
                <button type="button" className="col-sm-4 btn btn-success add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
            <div className="review-form">
              <div>
                <button type="button" className="btn btn-info" onClick={this.onClick}>Write a Review</button>
              </div>
              {this.state.edit && <ReviewForm onSubmit={ this.onFormSubmit } />}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-centered">
            <ReviewList reviews={this.props.reviews} selectedAlbum={this.props.selectedAlbum} />
          </div>
        </div>
      </div>

    )
  }
}


// <span value="1" className="glyphicon glyphicon-star" ></span>
