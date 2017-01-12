'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import App from './components/App'
import HomeContainer from './containers/HomeContainer'
import AlbumContainer from './containers/AlbumContainer'
import AlbumsContainer from './containers/AlbumsContainer'



render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/albums" component={AlbumsContainer} />
        <Route path="/albums/:albumId" component={AlbumContainer} />
        <IndexRedirect to="/home" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
