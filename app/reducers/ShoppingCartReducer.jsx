import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const ADD_ALBUM = 'GET_ALBUMS'
const REMOVE_ALBUM = 'REMOVE_ALBUM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

/* -----------------    ACTION CREATORS    ------------------ */

export const addAlbum = (album, quantity) => {
  return {
    type: ADD_ALBUM,
    album,
    quantity
  }
}

export const removeAlbum = (album) => {
  return {
    type: REMOVE_ALBUM,
    album
  }
}

export const updateQuantity = (quantity) => {
  return {
    type: UPDATE_QUANTITY,
    quantity
  }
}

/* -----------------    DISPATCHERS    ------------------ */

export const addAlbumToDBCart = (user_id, album_id, quantity) => dispatch => {
  axios.put(`/api/${user_id}/cart/${album_id}`, {
      user_id,
      quantity,
      album_id
  })
  .then(() => dispatch(addAlbum(albumId)))
  .catch(err => console.error('unable to add album to cart', err))
}

export const removeAlbumFromDBCart = (albumId) => dispatch => {
  axios.delete('/api/:userId/cart/:albumId')
  .then(() => dispatch(removeAlbum(albumId)))
  .catch(err => console.error('unable to remove album from cart', err))
}

/* -----------------     REDUCER     ------------------ */

const reducer = (state = [], action) => {

  const newState = Object.assign([], state);

  switch (action.type) {
    case ADD_ALBUM:
      const newAlbum = {[action.album]: 1}
      newState.push(newAlbum)
      break
    case REMOVE_ALBUM:
      newState.splice([action.album])
      break
    case UPDATE_QUANTITY:
      newState[action.album] = action.quantity
      break
    default:
      return state
  } 

  return newState
}

export default reducer