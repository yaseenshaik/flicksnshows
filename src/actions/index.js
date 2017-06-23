import { CALL_API } from '../middleware/api'
// import * as Schema from '../schemas'

export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
export const RECEIVE_MOVIE = 'RECEIVE_MOVIE'
export const HANDLE_ERROR = 'HANDLE_ERROR'

const fetchMovie = movieId => ({
  [CALL_API]: {
    types: [REQUEST, SUCCESS, FAILURE],
    endpoint:
      'https://api.themoviedb.org/3/movie/550?api_key=f24c6cee665fed9563c530c78bba3e81'
  }
})

export const loadMovie = movieId => (dispatch, getState) => {
  return dispatch(fetchMovie())
}

export const receiveMovie = json => ({
  action: RECEIVE_MOVIE,
  data: json
})

export const handleError = error => ({
  action: HANDLE_ERROR,
  error: error.message || 'Oops! This is not suppose to happen.'
})
