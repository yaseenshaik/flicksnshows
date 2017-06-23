import React from 'react'
import { Link } from 'react-router'

export default () =>
  <div className="ui massive top fixed menu">
    <div className="item">
      <img src="/assets/images/logo.png" alt="logo" />
    </div>
    <div className="right menu">
      <Link className="item">Popular</Link>
      <Link className="item">Favorites</Link>
      <Link className="item">About</Link>
    </div>
  </div>
