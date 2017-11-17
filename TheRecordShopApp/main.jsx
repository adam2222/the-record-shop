'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import App from './components/App'
import Signup from './components/Signup'
import OrderConfirmation from './components/OrderConfirmation'

import AlbumContainer from './containers/AlbumContainer'
import AllAlbumsContainer from './containers/AllAlbumsContainer'
import ShoppingCartContainer from './containers/ShoppingCartContainer'
import CheckoutContainer from './containers/CheckoutContainer'
import AllOrders from './components/AllOrders'
import SingleOrder from './components/SingleOrder'

import { loadAlbums, getAlbumById, filterAlbums } from './reducers/AllAlbumsReducer'
import { getCartFromDB } from './reducers/ShoppingCartReducer'
import { loadReviews } from './reducers/AlbumReviewsReducer'
import { whoami } from './reducers/auth'
import { doIHaveGuestId } from './reducers/GuestReducer'
import { getUserOrders, getSingleOrder } from './reducers/OrdersReducer'

import store from './store'

const fetchAllData = () => {
  store.dispatch(loadAlbums())
  store.dispatch(whoami());
  store.dispatch(doIHaveGuestId())
}

const onAlbumEnter = (nextRouterState) => {
  const albumId = +nextRouterState.params.albumId
  store.dispatch(getAlbumById(albumId))
  store.dispatch(loadReviews(albumId))
}

const onGenreEnter = (nextRouterState) => {
  const genre = nextRouterState.params.genre.split("-").join(" ")
  const allAlbums = store.getState().albums.allAlbums
  let filtered = allAlbums.filter(album => {
    return (
      album.genre.toLowerCase().match(genre.toLowerCase())
    )})

  store.dispatch(filterAlbums(filtered))
}

const onOrderEnter = (nextRouterState) => {
  const byUserId = nextRouterState.params.userId
  store.dispatch(getUserOrders(byUserId))
}

const onSingleOrderEnter = (nextRouterState) => {
  const byUserId = nextRouterState.params.userId
  const byOrderId = nextRouterState.params.orderId
  store.dispatch(getSingleOrder(byUserId, byOrderId))
}

const onCartEnter = (nextRouterState) => {
  const userId = nextRouterState.params.userId

  store.dispatch(getCartFromDB(userId))
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={ fetchAllData }>
        <Route path="/home" component={ AllAlbumsContainer }/>
        <Route path="/signup" component={Signup}/>
        <Route path="/genre/:genre" component={ AllAlbumsContainer } onEnter={onGenreEnter}/>
        <Route path="/albums/:albumId" component={AlbumContainer} onEnter={onAlbumEnter}/>
        <Route path="/orders/:userId" component={ AllOrders } onEnter={ onOrderEnter} />
        <Route path="/orders/:userId/:orderId" component={ SingleOrder } onEnter={ onSingleOrderEnter} />
        <Route path="/:userId/cart" component={ShoppingCartContainer} onEnter={onCartEnter}/>
        <Route path="/:userId/checkout" component={CheckoutContainer} onEnter={onCartEnter}/>
        <Route path="/:userId/checkout/confirm" component={OrderConfirmation}/>
        <IndexRedirect to="/home" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
