import React from 'react'
import { Container } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Header from './Header'

const App = ({ children }) =>
  <Container>
    <Header />
    {children}
  </Container>

App.propTypes = {
  children: PropTypes.node
}

export default App
