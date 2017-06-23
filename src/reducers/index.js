import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import entities from './entities'
import active from './apiReducers'

const rootReducer = combineReducers({
  entities,
  active,
  // visibilityFilter,
  routing
})

export default rootReducer
