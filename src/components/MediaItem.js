import React from 'react'
import { Item, Icon } from 'semantic-ui-react'

const imageBaseUrl = 'https://image.tmdb.org/t/p/w300/'

export default props =>
  <Item>
    <Item.Image size="small" src={imageBaseUrl + props.poster_path} />
    <Item.Content>
      <Item.Header as="a">{props.title || props.name}</Item.Header>
      <Item.Meta>
        <Icon name="calendar" />{' '}
        {new Date(
          props.release_date || props.first_air_date
        ).toLocaleDateString()}
        {' '}
      </Item.Meta>
      <Item.Description>{props.overview}</Item.Description>
      <Item.Extra>
        <Icon color="yellow" name="star" /> {props.vote_average}
      </Item.Extra>
    </Item.Content>
  </Item>
