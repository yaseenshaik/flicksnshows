import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import entities from './entities'
import active from './apiReducers'
import notes from './notes'
import favorites from './favorites'

const rootReducer = combineReducers({
  entities,
  active,
  // visibilityFilter,
  notes,
  favorites,
  routing
})

export default rootReducer
