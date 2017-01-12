import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const GET_ALBUM = 'GET_ALBUM'

/* -----------------    ACTION CREATORS    ------------------ */

export const findAlbum = (album) => {
  return {
    type: GET_ALBUM,
    album
  }
}

/* -----------------    DISPATCHERS     ------------------ */

export const getSingleAlbum = (id) => dispatch => {
  axios.get(`/api/albums/${id}`)
  .then(response => dispatch(findAlbum(response.data)))
  .catch(err => console.error('unable to fetch single album', err))
}

/* -----------------    REDUCER     ------------------ */

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALBUM:
      return action.album
    default:
      return state
  }
}

export default reducer
