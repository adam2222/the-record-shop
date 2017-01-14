import React, { Component } from 'react';
import Login from './Login';
import Search from './Search'

export default class Header extends Component {
  render(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2"> <img id="logo" src='/images/logo.png' /> </div>
          <div className="col-md-5"><Search /></div>
          <div className="col-md-5"> <Login /> </div>
        </div>
      </div>
      )
  }

}
