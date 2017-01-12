import { combineReducers } from 'redux'
import AllAlbumsReducer from './AllAlbumsReducer'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  albums: AllAlbumsReducer
})

export default rootReducer
