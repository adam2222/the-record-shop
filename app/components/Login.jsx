import React from 'react'

export const Login = (props) => {
  const authenticated = props.authenticated;
  const login = props.login;
  const logout = props.logout;
  console.log('AUTHENTICATED', authenticated)

  const loggedOut = (
    <ul className="nav navbar-nav navbar-right" id="blue">
      <li><a href="#"><span className="glyphicon glyphicon-shopping-cart"></span></a></li>
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
           <li><a className="btn btn-social-icon btn-github">
             <span className="fa fa-github"></span>
           </a></li>
         </ul>
       </li>
      <li><a href="#">Sign Up</a></li>
    </ul>
  )


  const loggedIn = (
    <div>
      <ul className="nav navbar-nav navbar-right" id="blue">
        <li><a href="#"><span className="glyphicon glyphicon-shopping-cart"></span></a></li>
        <li><a href="#">Hello {authenticated && authenticated.firstName}!</a></li>
        <button className="btn btn-default navbar-btn" onClick={logout}>Log Out</button>
      </ul>
    </div>
  )

  return authenticated ? loggedIn : loggedOut

}

import {login, logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({
    authenticated: state.auth
  }),
  {login, logout},
) (Login)
