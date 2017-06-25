import { combineReducers } from 'redux'
import get from 'lodash/get'
import generateApiReducer from './generateApiReducer'
import {
  FLICKS_TOP_REQUEST,
  FLICKS_TOP_SUCCESS,
  FLICKS_TOP_FAILURE,
  SHOWS_TOP_REQUEST,
  SHOWS_TOP_SUCCESS,
  SHOWS_TOP_FAILURE
} from '../actions/topList'
import {
  DETAILS_REQUEST,
  DETAILS_SUCCESS,
  DETAILS_FAILURE,
  VIDEOS_REQUEST,
  VIDEOS_SUCCESS,
  VIDEOS_FAILURE,
  REVIEWS_REQUEST,
  REVIEWS_SUCCESS,
  REVIEWS_FAILURE
} from '../actions'
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actions/search'

const apiReducers = combineReducers({
  flicksTopList: generateApiReducer({
    types: [FLICKS_TOP_REQUEST, FLICKS_TOP_SUCCESS, FLICKS_TOP_FAILURE],
    successReducer: (state, action) => ({
      ...state,
      isFetching: false,
      ids: get(action, 'response.entities.flicksPages.1.results', [])
    })
  }),
  showsTopList: generateApiReducer({
    types: [SHOWS_TOP_REQUEST, SHOWS_TOP_SUCCESS, SHOWS_TOP_FAILURE],
    successReducer: (state, action) => ({
      ...state,
      isFetching: false,
      ids: get(action, 'response.entities.showsPages.1.results', [])
    })
  }),
  media: generateApiReducer({
    types: [DETAILS_REQUEST, DETAILS_SUCCESS, DETAILS_FAILURE],
    mapActionToKey: action => `${action.mediaType}_${action.id}`,
    successReducer: (state, action) => ({
      ...state,
      isFetching: false
    })
  }),
  videos: generateApiReducer({
    types: [VIDEOS_REQUEST, VIDEOS_SUCCESS, VIDEOS_FAILURE],
    mapActionToKey: action => `${action.mediaType}_${action.id}`,
    successReducer: (state, action) => ({
      ...state,
      fetchedOnce: true,
      isFetching: false
    })
  }),
  reviews: generateApiReducer({
    types: [REVIEWS_REQUEST, REVIEWS_SUCCESS, REVIEWS_FAILURE],
    mapActionToKey: action => `${action.mediaType}_${action.id}`,
    successReducer: (state, action) => ({
      ...state,
      fetchedOnce: true,
      isFetching: false
    })
  }),
  searchList: generateApiReducer({
    types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
    successReducer: (state, action) => ({
      ...state,
      isFetching: false,
      ids: get(action, 'response.entities.searchList.1.results', [])
    })
  })
})

export default apiReducers
