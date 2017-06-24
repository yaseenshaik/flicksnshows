import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'semantic-ui-react'
import Header from './Header'

const App = ({ children }) =>
  <div>
    <Header />
    <Divider horizontal hidden />
    {children}
  </div>

App.propTypes = {
  children: PropTypes.node
}

export default App
