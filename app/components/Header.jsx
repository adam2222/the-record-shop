import React, { Component } from 'react'
import Login from './Login'
import Search from './Search'

export default class Header extends Component {
  render(){
    return (
      <nav class="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header"> <img id="logo" src='/images/logo_inversed.png' /> </div>
          <div className="navbar-collapse collapse">
            <div className="nav navbar-nav">
              <li> <a href="#"> Home </a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact Us</a></li>
            </div>
            <div className="navbar-form navbar-left">
              <Search />
            </div>
            <div className="nav navbar-nav navbar-right">
              <Login />
            </div>
          </div>
        </div>
      </nav>
      )
  }

}
