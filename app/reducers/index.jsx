import { combineReducers } from 'redux'
import AllAlbumsReducer from './AllAlbumsReducer'
import AlbumReviewsReducer from './AlbumReviewsReducer'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  albums: AllAlbumsReducer,
  reviews: AlbumReviewsReducer
})

export default rootReducer
