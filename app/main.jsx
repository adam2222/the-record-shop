'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import App from './components/App'
// import HomeContainer from './containers/HomeContainer'
import AllAlbumsContainer from './containers/AllAlbumsContainer'

import { loadAlbums } from './reducers/AllAlbumsReducer'


import store from './store'

const fetchAllData = () => {
  store.dispatch(loadAlbums())
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={ fetchAllData }>
        <Route path="/home" component={ AllAlbumsContainer } />
        <IndexRedirect to="/home" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)


// const ExampleApp = connect(
//   ({ auth }) => ({ user: auth })
// ) (
//   ({ user, children }) =>
//     <div>
//       <nav>
//         {user ? <WhoAmI/> : <Login/>}
//       </nav>
//       {children}
//     </div>
// )
// <Route path="/puppies" component={AllPuppiesContainer}>
//   <Route path="/puppies/:breed" component={AllPuppiesContainer} />
// </Route>
//
// <Route path="puppy/:id" component={PuppyContainer} />
