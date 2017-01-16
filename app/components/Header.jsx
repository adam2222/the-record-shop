import React, { Component } from 'react'
import Login from './Login'
import Search from './Search'
import { Link } from 'react-router'

export default class Header extends Component {
  render(){
    return (
      <nav className="row navbar navbar-default">
          <div className="navbar-header">
            <img id="logo" src='/images/logo.png' />
            <span className="store-name">The Record Store</span>
          </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                   <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Genres <span className="caret"></span></a>
                     <ul className="dropdown-menu">
                       <li><Link to="/Indie-Rock">Indie Rock</Link></li>
                       <li><Link to="/Alternative-Rock">Alternative Rock</Link></li>
                       <li><Link to="/Soul">Soul</Link></li>
                       <li><Link to="/Hip-hop">Hip-hop</Link></li>
                       <li><Link to="/Other">Other</Link></li>
                    </ul>
                </li>
                <li><Search /></li>
                <li><Login /></li>
            </ul>
            </div>


      </nav>
      )
  }

}


// <ul className="nav navbar-nav" id="blue">
//   <li><Link to="/">Home</Link></li>
//   <li><a href="#">About</a></li>
//   <li><a href="#">Contact Us</a></li>
// </ul>
