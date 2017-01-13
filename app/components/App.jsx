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
