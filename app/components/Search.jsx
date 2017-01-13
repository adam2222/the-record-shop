import React from 'react'
import {Component} from 'react'

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputValue: ""
    }
  }

  handleChange(event){
    this.setState({
      inputValue: event.target.value
    })
  }

  render(){
    return (
        <form onSubmit={evt => {
          evt.preventDefault()
          search(evt.target.search.value)
        } }>
          <input name="search" onChange={this.handleChange} value={this.state.inputValue}/>
          <input type="submit" value="Search" />
        </form>
    )
  }
}



import {connect} from 'react-redux'

export default connect (state => ({
  allAlbums: state.allAlbums
})) (Search)
