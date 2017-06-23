import { CALL_API } from '../middleware/api'
// import * as Schema from '../schemas'
import { showListSchema, flickListSchema } from '../schemas'

export const FLICKS_TOP_REQUEST = 'FLICKS_TOP_REQUEST'
export const FLICKS_TOP_SUCCESS = 'FLICKS_TOP_SUCCESS'
export const FLICKS_TOP_FAILURE = 'FLICKS_TOP_FAILURE'

export const SHOWS_TOP_REQUEST = 'SHOWS_TOP_REQUEST'
export const SHOWS_TOP_SUCCESS = 'SHOWS_TOP_SUCCESS'
export const SHOWS_TOP_FAILURE = 'SHOWS_TOP_FAILURE'

export const fetchFlicksTop = movieId => ({
  [CALL_API]: {
    types: [FLICKS_TOP_REQUEST, FLICKS_TOP_SUCCESS, FLICKS_TOP_FAILURE],
    endpoint:
      'https://api.themoviedb.org/3/movie/popular?api_key=f24c6cee665fed9563c530c78bba3e81&language=en-US&page=1',
    schema: flickListSchema
  }
})

export const fetchShowsTop = movieId => ({
  [CALL_API]: {
    types: [SHOWS_TOP_REQUEST, SHOWS_TOP_SUCCESS, SHOWS_TOP_FAILURE],
    endpoint:
      'https://api.themoviedb.org/3/tv/top_rated?api_key=f24c6cee665fed9563c530c78bba3e81&language=en-US&page=1',
    schema: showListSchema
  }
})

export const fetchTop = () => dispatch => {
  dispatch(fetchShowsTop())
  dispatch(fetchFlicksTop())
}
