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
<<<<<<< Updated upstream

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
=======
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
>>>>>>> Stashed changes

render (
  <Provider store={store}>
    <Router history={browserHistory}>
<<<<<<< Updated upstream
      <Route path="/" component={App}>

        <Route path="/home" component={HomeContainer} />



        <IndexRedirect to="/home" />
=======
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
>>>>>>> Stashed changes
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
<<<<<<< Updated upstream

// <Route path="/puppies" component={AllPuppiesContainer}>
//   <Route path="/puppies/:breed" component={AllPuppiesContainer} />
// </Route>
//
// <Route path="puppy/:id" component={PuppyContainer} />
=======
>>>>>>> Stashed changes
