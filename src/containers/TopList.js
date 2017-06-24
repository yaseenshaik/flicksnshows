import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Item, Container } from 'semantic-ui-react'
import { fetchTop } from '../actions/topList'
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
    const { flicksTopList, showsTopList } = this.props

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
            <MediaItem type={flicksKey} key={item.id} {...item} />
          )}
        </Item.Group>
        <Item.Group className={activeItem !== showsKey ? 'hidden' : ''}>
          {showsTopList.map(item =>
            <MediaItem type={showsKey} key={item.id} {...item} />
          )}
        </Item.Group>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const {
    active: { flicksTopList, showsTopList },
    entities: { flicks, shows }
  } = state

  return {
    flicksTopList: (flicksTopList.ids || []).map(id => flicks[id]),
    showsTopList: (showsTopList.ids || []).map(id => shows[id])
  }
}

const mapDispatchToProps = {
  fetchTop
}

export default connect(mapStateToProps, mapDispatchToProps)(TopList)
