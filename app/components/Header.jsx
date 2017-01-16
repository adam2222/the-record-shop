import React, { Component } from 'react'
import Login from './Login'
import Search from './Search'
import { Link } from 'react-router'

export default class Header extends Component {
  constructor(props) {
    super(props)

  }

  render(){
    const findFilteredAlbums = this.props.findFilteredAlbums
    return (
      <nav className="row navbar navbar-default">
          <div className="navbar-header">
            <Link to="/" onClick={() => findFilteredAlbums([])}>
              <img id="logo" src='/images/logo.png' />
              <span className="store-name">The Record Store</span>
            </Link>
          </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                   <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Genres <span className="caret"></span></a>
                     <ul className="dropdown-menu">
                       <li><Link to="/genre/indie-rock">Indie Rock</Link></li>
                       <li><Link to="/genre/alternative-rock">Alternative Rock</Link></li>
                       <li><Link to="/genre/soul">Soul</Link></li>
                       <li><Link to="/genre/hip-hop">Hip-hop</Link></li>
                       <li><Link to="/genre/miscellaneous">Other</Link></li>
                    </ul>
                </li>
            </ul>
              <ul className="nav navbar-nav navbar-right">
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
