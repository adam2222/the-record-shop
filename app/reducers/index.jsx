import { combineReducers } from 'redux'
import AllAlbumsReducer from './AllAlbumsReducer'
import ShoppingCartReducer from './ShoppingCartReducer'
import AlbumReviewsReducer from './AlbumReviewsReducer'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  albums: AllAlbumsReducer,
  cart: ShoppingCartReducer,
  reviews: AlbumReviewsReducer
})

export default rootReducer
