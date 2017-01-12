import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer'
import HomeContainer from '../containers/HomeContainer'
import Footer from './footer'

export default class App extends Component {
  render(){
    return (
      <div>
        <HeaderContainer />
        <HomeContainer />
        <Footer />
      </div>
    )
  }
}
