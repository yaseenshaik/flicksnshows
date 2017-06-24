import React from 'react'
import { Link } from 'react-router'

export default () =>
  <div className="ui massive top fixed menu">
    <div className="item">
      <img src="/assets/images/logo.png" alt="logo" />
    </div>
    <div className="right menu">
      <Link className="item" to="/">Popular</Link>
      <Link className="item" to="/favorites">Favorites</Link>
      <Link className="item" to="/about">About</Link>
    </div>
  </div>
