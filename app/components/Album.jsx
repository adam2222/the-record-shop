import React, { Component } from 'react';
import Dropdown from './Dropdown';
import ReviewForm from './ReviewForm';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      edit: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onClick(event) {
    this.setState({
      edit: !this.state.edit
    })
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
    const album = this.props.selectedAlbum
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="image">
              <img src={album.image_front} className="img-responsive" />
            </div>
            <div>
              <div>
                <button type="button" className="btn btn-info" onClick={this.onClick}>Reviews</button>
              </div>
              <div className="row">
                {this.state.edit && <ReviewForm />}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text text-center">
              <h3>{album.title}</h3>
              <h4>{album.artist}</h4>
              <p>{album.description}</p>
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
      </div>
    )

  }
}
