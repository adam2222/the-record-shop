import React from 'react'
import { Link } from 'react-router'

export const Login = (props) => {
  const authenticated = props.authenticated;
  const login = props.login;
  const logout = props.logout;
  const guestUserId = props.guestUserId ? props.guestUserId : 0

  const loggedOut = (
    <ul className="nav navbar-nav navbar-right" id="blue">
      <li><Link to={`${guestUserId}/cart`}><span className="glyphicon glyphicon-shopping-cart"></span></Link></li>
      <li className="dropdown">
         <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sign In <span className="caret"></span></a>
         <ul className="dropdown-menu">
           <li>
             <form className="navbar-form" onSubmit={evt => {
                 evt.preventDefault()
                 login(evt.target.username.value, evt.target.password.value)
               } }>
               <input className="form-control" name="username" placeholder="Email"/>
               <input className="form-control" name="password" type="password" placeholder="Password" />
               <button className="btn btn-default" type="submit">Log In</button>
             </form>
           </li>
           <li role="separator" className="divider"></li>
           <li>
             <div id="social-icon-group">
               <a className="btn btn-social-icon btn-facebook" href="/api/auth/facebook/login">
                 <span className="fa fa-facebook"></span>
              </a>
               <a className="btn btn-social-icon btn-google" href="/api/auth/google/login">
                 <span className="fa fa-google"></span>
               </a>
             <a className="btn btn-social-icon btn-github" href="/api/auth/github/login">
               <span className="fa fa-github"></span>
             </a>
           </div>
          </li>
         </ul>
       </li>
      <li><Link to={'/signup'}>Sign Up</Link></li>
    </ul>
  )


  const loggedIn = (
    <div>
      <ul className="nav navbar-nav navbar-right" id="blue">
        <li>{authenticated && <Link to={`/${authenticated.id}/cart`}><span className="glyphicon glyphicon-shopping-cart"></span></Link>}</li>
        <li className="dropdown">
         <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hello {authenticated && authenticated.firstName}! <span className="caret"></span></a>
           <ul className="dropdown-menu">
            <li>{authenticated && <Link to={`/orders/${authenticated.id}`}>View Orders</Link>}</li>
          </ul>
        </li>
        <button className="btn btn-default navbar-btn" onClick={logout}>Log Out</button>
      </ul>
    </div>
  )

  return authenticated ? loggedIn : loggedOut

}

import {login, logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  const guestUserId = state.guest.guestUser ? state.guest.guestUser.id : null

  return ({
    authenticated: state.auth,
    guestUserId
  })
}
export default connect (
  state => mapStateToProps,
  {login, logout},
) (Login)
