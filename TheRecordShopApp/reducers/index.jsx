import { combineReducers } from 'redux'
import AllAlbumsReducer from './AllAlbumsReducer'
import ShoppingCartReducer from './ShoppingCartReducer'
import AlbumReviewsReducer from './AlbumReviewsReducer'
import GuestReducer from './GuestReducer'
import OrdersReducer from './OrdersReducer'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  albums: AllAlbumsReducer,
  cart: ShoppingCartReducer,
  guest: GuestReducer,
  reviews: AlbumReviewsReducer,
  orders: OrdersReducer
})

export default rootReducer
