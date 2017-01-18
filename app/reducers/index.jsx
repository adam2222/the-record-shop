import { combineReducers } from 'redux'
import AllAlbumsReducer from './AllAlbumsReducer'
import ShoppingCartReducer from './ShoppingCartReducer'
import AlbumReviewsReducer from './AlbumReviewsReducer'
import GuestReducer from './GuestReducer'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  albums: AllAlbumsReducer,
  cart: ShoppingCartReducer,
  guest: GuestReducer,
  reviews: AlbumReviewsReducer
})

export default rootReducer
