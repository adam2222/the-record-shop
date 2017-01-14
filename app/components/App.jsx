import React, { Component } from 'react'
import HeaderContainer from '../containers/HeaderContainer'
// import Footer from './footer'

export default (props) => {
  return (
    <div className="container-fluid">
      <div className="row" id="header">
        <HeaderContainer />
      </div>

      <div className="row" id="body">
        {props.children}
      </div>
    </div>
  )
}
