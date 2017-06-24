import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import api from '../middleware/api'
import rootReducer from '../reducers'

const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(thunk, api), persistState())
  )

export default configureStore
