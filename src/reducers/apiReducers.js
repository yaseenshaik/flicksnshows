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

const apiReducers = combineReducers({
  flicksTopList: generateApiReducer({
    types: [FLICKS_TOP_REQUEST, FLICKS_TOP_SUCCESS, FLICKS_TOP_FAILURE],
    successReducer: (state, action) => ({
      ...state,
      ids: get(action, 'response.entities.flicksPages.1.results', [])
    })
  }),
  showsTopList: generateApiReducer({
    types: [SHOWS_TOP_REQUEST, SHOWS_TOP_SUCCESS, SHOWS_TOP_FAILURE],
    successReducer: (state, action) => ({
      ...state,
      ids: get(action, 'response.entities.showsPages.1.results', [])
    })
  })
})

export default apiReducers
