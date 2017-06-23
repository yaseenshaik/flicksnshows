import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Item } from 'semantic-ui-react'
import { fetchTop } from '../actions/topList'
import MediaItem from '../components/MediaItem'
import './styles.css'

class TopList extends Component {
  state = {
    activeItem: 'flicks'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
    const { fetchTop, flicksTopList, isFetching } = this.props

    if (flicksTopList.length === 0 && !isFetching) {
      fetchTop()
    }
  }

  render() {
    const { activeItem } = this.state
    const activeList = this.props[activeItem + 'TopList']
    return (
      <div>
        <Menu pointing secondary size="large">
          <Menu.Item name="Popular this week" />
          <Menu.Menu position="right">
            <Menu.Item
              name="flicks"
              active={activeItem === 'flicks'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="shows"
              active={activeItem === 'shows'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
        <Item.Group>
          {activeList.map(item => <MediaItem key={item.id} {...item} />)}
        </Item.Group>
      </div>
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
