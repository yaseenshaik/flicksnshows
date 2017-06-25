import { CALL_API } from '../middleware/api'
import { showListSchema, flickListSchema } from '../schemas'
import { apiBaseUrl, tmdbApiKey } from '../constants'

export const FLICKS_TOP_REQUEST = 'FLICKS_TOP_REQUEST'
export const FLICKS_TOP_SUCCESS = 'FLICKS_TOP_SUCCESS'
export const FLICKS_TOP_FAILURE = 'FLICKS_TOP_FAILURE'

export const SHOWS_TOP_REQUEST = 'SHOWS_TOP_REQUEST'
export const SHOWS_TOP_SUCCESS = 'SHOWS_TOP_SUCCESS'
export const SHOWS_TOP_FAILURE = 'SHOWS_TOP_FAILURE'

export const fetchFlicksTop = () => ({
  [CALL_API]: {
    types: [FLICKS_TOP_REQUEST, FLICKS_TOP_SUCCESS, FLICKS_TOP_FAILURE],
    endpoint: `${apiBaseUrl}/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=1`,
    schema: flickListSchema
  }
})

export const fetchShowsTop = () => ({
  [CALL_API]: {
    types: [SHOWS_TOP_REQUEST, SHOWS_TOP_SUCCESS, SHOWS_TOP_FAILURE],
    endpoint: `${apiBaseUrl}/tv/popular?api_key=${tmdbApiKey}&language=en-US&page=1`,
    schema: showListSchema
  }
})

export const fetchTop = () => dispatch => {
  dispatch(fetchShowsTop())
  dispatch(fetchFlicksTop())
}
