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



/* -----------------    REDUCER     ------------------ */

