import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Item, Container, Segment } from 'semantic-ui-react'
import MediaItem from '../components/MediaItem'
import { loadDetails } from '../actions'
import { toggleFavorite } from '../actions/favorites'

const NoFavorites = () =>
  <Segment padded basic textAlign="center">
    You don't have any favorites. Please click on the heart icon to add
    somthing.
  </Segment>

class Favorites extends Component {
  state = {
    activeItem: 'flick'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  fetchAllDetails = () => {
    const { props } = this
    const { favorites, loadDetails } = props
    const types = ['flick', 'show']

    types.forEach(type => {
      const key = type + 's'

      Object.keys(favorites[key]).forEach(id => {
        if (props[key][id] === undefined) {
          loadDetails(id, type)
        }
      })
    })
  }

  componentDidMount() {
    this.fetchAllDetails()
  }

  render() {
    const { activeItem } = this.state
    const { flicks, shows, favorites, toggleFavorite } = this.props
    const [flicksKey, showsKey] = ['flick', 'show']
    const flicksList = Object.keys(favorites.flicks)
    const showsList = Object.keys(favorites.shows)

    return (
      <Container text>
        <Menu pointing secondary size="large">
          <Menu.Item name="Favorites" />
          <Menu.Menu position="right">
            <Menu.Item
              children="Flicks"
              name={flicksKey}
              active={activeItem === flicksKey}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              children="Shows"
              name={showsKey}
              active={activeItem === showsKey}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
        <div className={activeItem !== flicksKey ? 'hidden' : ''}>
          {flicksList.length === 0
            ? <NoFavorites />
            : <Item.Group>
                {flicksList.map(id => {
                  const item = flicks[id]
                  if (!item) return null
                  return (
                    <MediaItem
                      type={flicksKey}
                      key={item.id}
                      {...item}
                      favorite={1}
                      toggleFavorite={e => toggleFavorite(item.id, flicksKey)}
                    />
                  )
                })}
              </Item.Group>}
        </div>
        <div className={activeItem !== showsKey ? 'hidden' : ''}>
          {showsList.length === 0
            ? <NoFavorites />
            : <Item.Group className={activeItem !== showsKey ? 'hidden' : ''}>
                {showsList.map(id => {
                  const item = shows[id]
                  if (!item) return null
                  return (
                    <MediaItem
                      type={showsKey}
                      key={item.id}
                      {...item}
                      favorite={1}
                      toggleFavorite={e => toggleFavorite(item.id, showsKey)}
                    />
                  )
                })}
              </Item.Group>}
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { entities: { flicks, shows }, favorites } = state

  return {
    flicks,
    shows,
    favorites
  }
}

const mapDispatchToProps = {
  toggleFavorite,
  loadDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
