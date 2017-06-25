import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import TopList from './containers/TopList'
import MediaInfo from './containers/MediaInfo'
import Favorites from './containers/Favorites'
import Search from './containers/Search'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/popular" component={TopList} />
    <Route path="/:type/:id(/:title)" component={MediaInfo} />
    <Route path="/favorites" component={Favorites} />
    <Route path="/search" component={Search} />
  </Route>
)
