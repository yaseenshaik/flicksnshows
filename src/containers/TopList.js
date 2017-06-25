import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Item, Container } from 'semantic-ui-react'
import { fetchTop } from '../actions/topList'
import { toggleFavorite } from '../actions/favorites'
import MediaItem from '../components/MediaItem'
import './styles.css'

class TopList extends Component {
  state = {
    activeItem: 'flick'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
    const { fetchTop, flicksTopList, isFetching } = this.props

    if (flicksTopList.length === 0 && !isFetching) {
      fetchTop()
    }
  }

  render() {
    const flicksKey = 'flick'
    const showsKey = 'show'
    const { activeItem } = this.state
    const {
      flicksTopList,
      showsTopList,
      favorites,
      toggleFavorite
    } = this.props

    return (
      <Container text>
        <Menu pointing secondary size="large">
          <Menu.Item name="Popular this week" />
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
        <Item.Group className={activeItem !== flicksKey ? 'hidden' : ''}>
          {flicksTopList.map(item =>
            <MediaItem
              key={item.id}
              {...item}
              type={flicksKey}
              favorite={favorites.flicks[item.id]}
              toggleFavorite={e => toggleFavorite(item.id, flicksKey)}
            />
          )}
        </Item.Group>
        <Item.Group className={activeItem !== showsKey ? 'hidden' : ''}>
          {showsTopList.map(item =>
            <MediaItem
              key={item.id}
              {...item}
              type={showsKey}
              favorite={favorites.shows[item.id]}
              toggleFavorite={e => toggleFavorite(item.id, showsKey)}
            />
          )}
        </Item.Group>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const {
    active: { flicksTopList, showsTopList },
    entities: { flicks, shows },
    favorites
  } = state

  return {
    flicksTopList: (flicksTopList.ids || []).map(id => flicks[id]),
    showsTopList: (showsTopList.ids || []).map(id => shows[id]),
    favorites
  }
}

const mapDispatchToProps = {
  fetchTop,
  toggleFavorite
}

export default connect(mapStateToProps, mapDispatchToProps)(TopList)
