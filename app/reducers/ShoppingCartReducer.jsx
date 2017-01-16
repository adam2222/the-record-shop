import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const ADD_ALBUM = 'ADD_ALBUM'
const FIND_CART = 'FIND_CART'
const REMOVE_ALBUM = 'REMOVE_ALBUM'
const REMOVE_ALBUMS = 'REMOVE_ALBUMS'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

/* -----------------    ACTION CREATORS    ------------------ */

export const addAlbum = album => {
  return {
    type: ADD_ALBUM,
    album
  }
}

export const findCart = albums => {
  return {
    type: FIND_CART,
    albums
  }
}

export const removeAlbum = album => {
  return {
    type: REMOVE_ALBUM,
    album
  }
}

export const removeAlbums = albums => {
  return {
    type: REMOVE_ALBUMS
  }
}

export const updateQuantity = quantity => {
  return {
    type: UPDATE_QUANTITY,
    quantity
  }
}

/* -----------------    DISPATCHERS    ------------------ */

export const getCartFromDB = user_id => dispatch => {
  axios.get(`/api/users/${user_id}/cart`)
  .then(cart => {
    // Transformation of data returned by DB into format accepted by store
    let newCart = cart.data[0]
    dispatch(findCart(newCart))
  })
  .catch(err => console.error('unable to get cart info', err))
}

export const addOrUpdateAlbumInDB = (user_id, album_id, quantity) => dispatch => {
  axios.put(`/api/${user_id}/cart/${album_id}`, {
      user_id,
      quantity,
      album_id
  })
  .then((response) => {
    dispatch(addAlbum(album_id))
  })
  .catch(err => console.error('unable to add album to cart', err))
}

export const removeAlbumFromDB = (user_id, album_id) => dispatch => {

  axios.delete(`/api/users/${user_id}/cart/${album_id}`)
  .then(() => dispatch(removeAlbum(album_id)))
  .catch(err => console.error('unable to remove album from cart', err))
}

export const removeAllAlbumsFromDB = user_id => dispatch => {
  axios.delete(`/api/users/${user_id}/cart`)
  .then(() => dispatch(removeAlbums(user_id)))
  .catch(err => console.error('unable to empty cart', err))
}

/* -----------------     REDUCER     ------------------ */

const reducer = (state = [], action) => {

  let newState = Object.assign([], state);

  switch (action.type) {
    case FIND_CART:
      newState = action.albums
      break
    case ADD_ALBUM:
      const newAlbum = {'id': action.album, 'quantity': action.quantity}
      newState.push(newAlbum)
      break
    case REMOVE_ALBUM:

      newState = state.filter(item => item.id !== action.album)
      break
    case REMOVE_ALBUMS:
      newState = []
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