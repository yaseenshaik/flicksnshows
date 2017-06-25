import { CALL_API } from '../middleware/api'
import { searchListSchema } from '../schemas'
import { apiBaseUrl, tmdbApiKey } from '../constants'

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'

const fetchSearch = query => ({
  [CALL_API]: {
    types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
    endpoint: `${apiBaseUrl}/search/multi?api_key=${tmdbApiKey}&query=${query}&language=en-US&page=1&include_adult=false`,
    schema: searchListSchema
  }
})

export const searchQuery = query => dispatch => {
  dispatch(fetchSearch(encodeURIComponent(query)))
}
