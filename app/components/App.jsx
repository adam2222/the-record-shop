import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer'
import HomeContainer from '../containers/HomeContainer'
import Footer from './Footer'

export default function App (props) {

    return (
      <div>
        <HeaderContainer />
        <HomeContainer />
        <Footer />
      </div>
    )
}
