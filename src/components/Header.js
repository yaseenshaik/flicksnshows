import React from 'react'
import { Link } from 'react-router'
import { Icon } from 'semantic-ui-react'

export default () =>
  <div className="ui massive top fixed menu inverted">
    <Link className="item" to="/">
      <img src="/assets/images/logo.png" alt="logo" />
    </Link>
    <div className="right menu">
      <Link className="item" to="/popular">Popular</Link>
      <Link className="item" to="/favorites">Favorites</Link>
      <Link className="item" to="/search">
        <Icon name="search" />
      </Link>
    </div>
  </div>
