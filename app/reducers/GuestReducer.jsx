import axios from 'axios'
import {addAlbumToDB} from './ShoppingCartReducer'

const CREATE_GUEST = 'CREATE_GUEST'
// ******************************************

export const createGuest = (guest) => {
  return {
    type: CREATE_GUEST,
    guest
  }
}

// ******************************************
export const createGuestUser = (albumId, quantity) => dispatch => {
  axios.post('api/users/guest')
  .then(guest => guest.data)
  .then(guest => {
     dispatch(createGuest(guest))
     return guest;
  })
  .then(guest => {
    dispatch(addAlbumToDB(guest.id, albumId, quantity ))
  })
  .catch(console.error)
}

export const doIHaveGuestId = () => dispatch => {
  axios.get('api/users/guest')
  .then(guest => guest.data)
  .then(guest => {
    dispatch(createGuest(guest))
  })

}

// ******************************************

const reducer = (state = { guestUser: null }, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case CREATE_GUEST:
      newState.guestUser = action.guest
      break
    default:
      return state
  }
  return newState
}

export default reducer
