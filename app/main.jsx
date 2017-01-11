'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import App from './components/App'
import HomeContainer from './containers/HomeContainer'
// import Puppies from './components/Puppies'
// import Puppies from './components/Puppies'
// import PuppyContainer from './components/PuppyContainer'

import store from './store'

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

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>

        <Route path="/home" component={HomeContainer} />



        <IndexRedirect to="/home" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

// <Route path="/puppies" component={AllPuppiesContainer}>
//   <Route path="/puppies/:breed" component={AllPuppiesContainer} />
// </Route>
//
// <Route path="puppy/:id" component={PuppyContainer} />
