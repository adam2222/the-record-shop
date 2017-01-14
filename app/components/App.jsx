import React, { Component } from 'react'
import HeaderContainer from '../containers/HeaderContainer'
// import Footer from './footer'

export default (props) => {
  return (
    <div>
      <HeaderContainer />
      {props.children}
    </div>
  )
}

// <div className="row-header" id="header"> <HeaderContainer /></div>
// <div id="body">{props.children && React.cloneElement(props.children, props)}</div>