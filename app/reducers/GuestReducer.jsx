import axios from 'axios'

const CREATE_GUEST = 'CREATE_GUEST'
// ******************************************

export const createGuest = (guest) => {
  return {
    type: CREATE_GUEST,
    guest
  }
}

// ******************************************
export const createGuestUser = () => dispatch => {
  axios.post('api/users/guest')
  .then(guest => {
    dispatch(createGuest(guest.data))
  })
  .catch(console.error)
}

export const doIHaveGuestId = () => dispatch => {
  axios.get('api/users/guest')
  .then(guest => guest.data)
  .then(guest => dispatch(createGuest(guest)))

}

// ******************************************

const reducer = (state = { guestUser: null }, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case CREATE_GUEST:
      newState = action.guest
      break
    default:
      return state
  }
  return newState
}

export default reducer
