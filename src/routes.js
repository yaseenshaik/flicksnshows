import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import TopList from './containers/TopList'
import MediaInfo from './containers/MediaInfo'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TopList} />
    <Route path="/:type/:id(/:title)" component={MediaInfo} />
  </Route>
)
