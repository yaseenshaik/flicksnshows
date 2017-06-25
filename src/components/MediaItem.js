import React from 'react'
import { Item, Icon, Rating } from 'semantic-ui-react'
import { Link } from 'react-router'
import truncate from 'lodash/truncate'
import { imageBaseUrl } from '../constants'

export default props => {
  let { type } = props
  let title, date

  if (type === 'flick') {
    title = props.title
    date = props.releaseDate
    type = 'flick'
  } else {
    type = 'show'
    title = props.name
    date = props.firstAirDate
  }

  return (
    <Item>
      <Item.Image size="small" src={imageBaseUrl + props.posterPath} />
      <Item.Content>
        <Item.Header>
          <Link
            to={`/${type}/${props.id}/${title.replace(/[\s.<>:;&,]/g, '-')}`}
          >
            {title}
          </Link>
        </Item.Header>
        <Item.Meta>
          <Icon name="calendar" />{' '}
          {new Date(date).getFullYear()}
          {' '}
        </Item.Meta>
        <Item.Description>
          {truncate(props.overview, { length: 250 })}
        </Item.Description>
        <Item.Extra>
          {props.voteAverage} <Icon color="yellow" name="star" />
          {' '}
          Favorite
          {' '}
          <Rating
            icon="heart"
            onRate={props.toggleFavorite}
            rating={props.favorite ? 1 : 0}
          />
        </Item.Extra>

      </Item.Content>
    </Item>
  )
}
