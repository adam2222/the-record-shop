import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const GET_ALBUMS = 'GET_ALBUMS'
const UPDATE_ALBUM_INVENTORY = 'UPDATE_ALBUM_INVENTORY'


/* -----------------    ACTION CREATORS    ------------------ */

export const findAlbums = (allAlbums) => {
  return {
    type: GET_ALBUMS,
    allAlbums
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


/* -----------------    REDUCER     ------------------ */

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALBUMS:
      return action.allAlbums
    case UPDATE_ALBUM_INVENTORY:
      return state.map(album => album.id === action.updatedAlbum.id ? action.updatedAlbum : album)
    default:
      return state
  }
}


export default reducer
