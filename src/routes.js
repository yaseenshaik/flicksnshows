import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import TopList from './containers/TopList'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TopList} />
  </Route>
)
