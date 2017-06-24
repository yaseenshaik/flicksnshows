import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Comment,
  Container,
  Divider,
  Embed,
  Form,
  Icon,
  Image,
  Grid,
  Header,
  List,
  Menu,
  Segment,
  Statistic,
  TextArea
} from 'semantic-ui-react'
import get from 'lodash/get'
import { loadDetails, loadVideos, loadReviews } from '../actions'
import { putNote } from '../actions/notes'
import { imageBaseUrl } from '../constants'

class MediaInfo extends Component {
  state = { activeItem: 'videos' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  loadDetailsIfNeeded = ({ details, params, status }) => {
    const { loadDetails } = this.props

    if (!details.hasOwnProperty('genres') && status.isFetching !== true) {
      loadDetails(params.id, params.type)
    }
  }

  loadReviewsIfNeeded = ({ reviews, params, reviewsStatus }) => {
    const { loadReviews } = this.props

    if (
      reviewsStatus.fetchedOnce !== true &&
      reviewsStatus.isFetching !== true
    ) {
      loadReviews(params.id, params.type)
    }
  }

  loadVideosIfNeeded = ({ videos, params, videosStatus }) => {
    const { loadVideos } = this.props

    if (videosStatus.fetchedOnce !== true && videosStatus.isFetching !== true) {
      loadVideos(params.id, params.type)
    }
  }

  loadEverything = props => {
    this.loadDetailsIfNeeded(props)
    this.loadVideosIfNeeded(props)

    if (props.params.type === 'flick') {
      this.loadReviewsIfNeeded(props)
    }
  }

  componentDidMount() {
    this.loadEverything(this.props)
  }

  componentWillReceiveProps(nextProps) {
    // this.loadDetailsIfNeeded(nextProps)
  }

  render() {
    const {
      details,
      status,
      videos,
      reviews,
      params: { type, id }
    } = this.props
    const { activeItem } = this.state

    if (status.isFetching || !details.genres) {
      return null
    }

    let title, date
    let stats = [
      { label: 'Rating', value: details.voteAverage },
      { label: 'Runtime', value: details.runtime || details.episodeRunTime[0] }
    ]

    if (type === 'flick') {
      title = details.title
      date = details.releaseDate
      stats.push({
        label: 'Revenue',
        value: Math.ceil(details.revenue / 10e6) + 'M'
      })
    } else {
      title = details.name
      date = details.firstAirDate
    }

    return (
      <div>
        <Container text>
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={6}>
              <Image fluid src={imageBaseUrl + details.posterPath} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={10}>
              <Header as="h1" content={title} subheader={details.tagline} />
              <Statistic.Group items={stats} color="teal" />
              <Divider horizontal hidden />
              <Header as="h3">Overview</Header>
              <p>{details.overview}</p>
              <Divider horizontal hidden />
              <List horizontal relaxed>
                <List.Item>
                  <Icon name="calendar" color="grey" />
                  <List.Content>
                    <List.Header>
                      {new Date(date).toLocaleDateString()}
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name="users" color="purple" />
                  <List.Content>
                    <List.Header>{details.voteCount}</List.Header>
                  </List.Content>
                </List.Item>
                {type === 'flick' &&
                  <List.Item>
                    <Icon name="money" color="green" />
                    <List.Content>
                      <List.Header>
                        {Math.ceil(details.budget / 10e6) + 'M'}
                      </List.Header>
                    </List.Content>
                  </List.Item>}
              </List>
              <Divider horizontal hidden />
            </Grid.Column>
          </Grid>
          <Menu pointing secondary size="large">
            <Menu.Item
              name="videos"
              active={activeItem === 'videos'}
              onClick={this.handleItemClick}
            />
            {type === 'flick' &&
              <Menu.Item
                name="reviews"
                active={activeItem === 'reviews'}
                onClick={this.handleItemClick}
              />}
            <Menu.Item
              name="notes"
              active={activeItem === 'notes'}
              onClick={this.handleItemClick}
            />
          </Menu>
          <div className={activeItem !== 'videos' ? 'hidden' : ''}>
            {videos.map(video =>
              <Segment basic key={video.key}>
                <Header as="h3">{video.name}</Header>
                <Embed
                  id={video.key}
                  source={video.site.toLowerCase()}
                  placeholder={`https://i3.ytimg.com/vi/${video.key}/0.jpg`}
                />
              </Segment>
            )}
          </div>
          <Comment.Group className={activeItem !== 'reviews' ? 'hidden' : ''}>
            {reviews.map(review =>
              <Comment key={review.id}>
                <Comment.Content>
                  <Comment.Author>{review.author}</Comment.Author>
                  <Comment.Text>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: review.content.replace(/\n/g, '<br/>')
                      }}
                    />
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            )}
          </Comment.Group>
          <Segment basic className={activeItem !== 'notes' ? 'hidden' : ''}>
            <Form>
              <TextArea
                autoHeight
                value={this.props.note}
                style={{ minHeight: 100 }}
                placeholder="Anything you write here will be saved automatically."
                onChange={(e, { value }) => this.props.putNote(id, type, value)}
              />
            </Form>
          </Segment>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { type, id } = ownProps.params
  const { entities, active, notes } = state
  const details = entities[type + 's'][id] || {}
  const status = active.media[`${type}_${id}`] || {}
  const videos = entities[type + 'sVideos'] || {}
  const videosList = get(entities, [type + 'sVideosList', id, 'results'], [])
  const videosStatus = active.videos[`${type}_${id}`] || {}
  // if (type === 'flick')
  const reviews = entities[type + 'sReviews'] || {}
  const reviewsList = get(entities, [type + 'sReviewsList', id, 'results'], [])
  const reviewsStatus = active.reviews[`${type}_${id}`] || {}
  const note = notes[`${type}_${id}`] || ''
  return {
    details,
    status,
    videosStatus,
    videos: videosList.map(id => videos[id]),
    reviewsStatus,
    reviews: reviewsList.map(id => reviews[id]),
    note
  }
}

const mapDispatchToProps = {
  loadDetails,
  loadVideos,
  loadReviews,
  putNote
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaInfo)
