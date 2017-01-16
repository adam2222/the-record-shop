import React, { Component } from 'react'
import Login from './Login'
import Search from './Search'
import { Link } from 'react-router'

export default class Header extends Component {
  render(){
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target=".navbar-collapse">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/"><img id="logo" src="/images/logo_inversed.png" /></Link>
        </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav" id="blue">
              <li><Link to="/">Home</Link></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
            <Search />
            <Login />
          </div>
        </div>
      </nav>
      )
  }

}
