import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Item, Container, Form, Input } from 'semantic-ui-react'
import MediaItem from '../components/MediaItem'
import { searchQuery } from '../actions/search'
import { toggleFavorite } from '../actions/favorites'

class Search extends Component {
  state = {
    query: ''
  }

  handleSearch = query => {
    const { searchQuery } = this.props

    searchQuery(query)
  }

  componentDidMount() {
    const query = this.props.location.query.q

    if (query) {
      this.setState({ query })
      this.handleSearch(query)
    }
  }

  componentWillReceiveProps(nextProps) {
    const query = this.props.location.query.q
    const nextQuery = nextProps.location.query.q

    if (query !== nextQuery) {
      this.handleSearch(nextQuery)
    }
  }

  render() {
    const { searchList, favorites, toggleFavorite, isFetching } = this.props
    const { query } = this.state

    return (
      <Container text>
        <Form
          onSubmit={e => {
            e.preventDefault()
            browserHistory.push(`/search?q=${this.state.query}`)
          }}
        >
          <Input
            fluid
            icon="search"
            placeholder="Search..."
            loading={isFetching}
            value={query}
            onChange={(e, { value }) => this.setState({ query: value })}
          />
        </Form>
        <Item.Group>
          {searchList.map(item => {
            const type = item.mediaType === 'movie' ? 'flick' : 'show'

            return (
              <MediaItem
                key={item.id}
                {...item}
                type={type}
                favorite={favorites[type + 's'][item.id]}
                toggleFavorite={e => toggleFavorite(item.id, type)}
              />
            )
          })}
        </Item.Group>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { active: { searchList }, favorites } = state

  return {
    isFetching: searchList.isFetching,
    searchList: searchList.ids || [],
    favorites
  }
}

const mapDispatchToProps = {
  searchQuery,
  toggleFavorite
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
