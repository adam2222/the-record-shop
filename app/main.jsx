'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <Header>
          <Search />
          <Login />
          <Cart />
        </Header>

        <Route path="home" component={Main}>

        <Route path="allPuppies" component={AllPuppies}>

        </Route>

          <Route path="puppy/:id">

          </Route>

        </Main>
        <IndexRedirect to="/Home" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
