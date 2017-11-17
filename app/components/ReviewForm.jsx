import React from 'react';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myRating: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ myRating: e.target.value })
  }

  componentWillMount() {
    this.setState({ myRating: 5 })
  }

  render(){
    let options = []
    for (let i = 5; i > 0; i--) {
      options.push(
        <option key={ i } value={ i }>{ i }</option>
      )
    }
    return (
        <form onSubmit={ event => this.props.onSubmit(event, this.state.myRating) }>
          <div className="form-group">
            <textarea
            name="description"
            type="text"
            className="form-control"
            />
          </div>
          <label>
          Rate this album!
            <select value={this.state.myRating} onChange={ this.handleChange }>
              {options}
            </select>
          </label>
          <div className="text-center">
            <button type="submit" className="btn btn-default">Submit</button>
          </div>
        </form>
    )
  }
}
//validation
ReviewForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}

export default ReviewForm
