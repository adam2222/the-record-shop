import { combineReducers } from 'redux'
import AllAlbumsReducer from './AllAlbumsReducer'
import ShoppingCartReducer from './ShoppingCartReducer'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  albums: AllAlbumsReducer,
  cart: ShoppingCartReducer
})

export default rootReducer
