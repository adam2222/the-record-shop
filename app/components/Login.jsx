import React from 'react'

export const Login = (props) => {
  const authenticated = props.authenticated;
  const login = props.login;
  console.log('AUTHENTICATED', authenticated)

  const loggedOut = (
    <ul className="nav navbar-nav navbar-right" id="blue">
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
      <a className="btn btn-social-icon btn-github">
        <span className="fa fa-github"></span>
      </a>
      <li><a href="#">Sign Up</a></li>
    </ul>
  )

  const loggedIn = (
    <ul className="nav navbar-nav navbar-right" id="blue">
      <li><a href="#"><span className="glyphicon glyphicon-shopping-cart"></span></a></li>
      <li><a href="#">Hello Username!</a></li>
      <li><a href="#">Log Out!</a></li>
    </ul>
  )

  return authenticated ? loggedIn : loggedOut

}

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({
    authenticated: state.auth
  }),
  {login},
) (Login)
