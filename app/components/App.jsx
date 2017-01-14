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

// <div className="row-header" id="header"> <HeaderContainer /></div>
// <div id="body">{props.children && React.cloneElement(props.children, props)}</div>
