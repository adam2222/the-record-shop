import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const GET_ALBUMS = 'GET_ALBUMS'
const GET_ALBUM = 'GET_ALBUM'
const UPDATE_ALBUM_INVENTORY = 'UPDATE_ALBUM_INVENTORY'


/* -----------------    ACTION CREATORS    ------------------ */

export const findAlbums = (allAlbums) => {
  return {
    type: GET_ALBUMS,
    allAlbums
  }
}

export const findAlbum = (selectedAlbum) => {
  return {
    type: GET_ALBUM,
    selectedAlbum
  }
}

export const updateAlbum = (updatedAlbum) => {
  return {
    type: UPDATE_ALBUM_INVENTORY,
    updatedAlbum
  }
}


/* -----------------    DISPATCHERS     ------------------ */

export const loadAlbums = () => dispatch => {
  axios.get(`/api/albums`)
  .then(response => dispatch(findAlbums(response.data)))
  .catch(err => console.error('unable to load albums', err))
}

export const updateAlbumQuantity = (albumId, amount) => dispatch => {
  axios.get(`/api/albums/${albumId}/decrement/${amount}`)
  .then(response => {
    const newlyUpdatedAlbum = response.data
    dispatch(updateAlbum(newlyUpdatedAlbum))
  })
  .catch(err => console.error('unable to update album', err))
}

export const getAlbumById = (albumId) => dispatch => {
  axios.get(`/api/albums/${albumId}`)
  .then(response => dispatch(findAlbum(response.data)))
}


/* -----------------    REDUCER     ------------------ */

const reducer = (state = {selectedAlbum: {}, allAlbums: []}, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_ALBUMS:
      newState.allAlbums = action.allAlbums;
      break
    case GET_ALBUM:
      newState.selectedAlbum = action.selectedAlbum
      break
    case UPDATE_ALBUM_INVENTORY:
      newState.allAlbums = state.map(album => album.id === action.updatedAlbum.id ? action.updatedAlbum : album);
      break
    default:
      return state
  } 

  return newState
}




export default reducer
