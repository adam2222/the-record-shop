'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import App from './components/App'
import AlbumContainer from './containers/AlbumContainer'
import AllAlbumsContainer from './containers/AllAlbumsContainer'

import { loadAlbums, getAlbumById } from './reducers/AllAlbumsReducer'

import store from './store'

const fetchAllData = () => {
  store.dispatch(loadAlbums())
}

const onAlbumEnter = (nextRouterState) => {
  const albumId = nextRouterState.params.albumId
  store.dispatch(getAlbumById(albumId))
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={ fetchAllData }>
        <Route path="/home" component={ AllAlbumsContainer } />
        <Route path="/albums/:albumId" component={AlbumContainer} onEnter={onAlbumEnter}/>
        {/*<IndexRedirect to="/home" />*/}
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
