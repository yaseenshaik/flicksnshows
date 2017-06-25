import { schema } from 'normalizr'

export const showSchema = new schema.Entity('shows')

export const showListSchema = new schema.Entity(
  'showsPages',
  {
    results: [showSchema]
  },
  {
    idAttribute: result => result.page
  }
)

export const flickSchema = new schema.Entity('flicks')

export const flickListSchema = new schema.Entity(
  'flicksPages',
  {
    results: [flickSchema]
  },
  {
    idAttribute: result => result.page
  }
)

const mixedListSchema = new schema.Array(
  {
    flicks: flickSchema,
    shows: showSchema
  },
  input => {
    if (input.mediaType === 'tv') {
      return 'flicks'
    }
    if (input.mediaType === 'movie') {
      return 'shows'
    }
    return 'unknown'
  }
)

export const searchListSchema = new schema.Entity(
  'searchList',
  {
    results: mixedListSchema
  },
  {
    idAttribute: result => result.page
  }
)

export const flicksVideosSchema = new schema.Entity('flicksVideos')

export const flicksVideosListSchema = new schema.Entity('flicksVideosList', {
  results: [flicksVideosSchema]
})

export const showsVideosSchema = new schema.Entity('showsVideos')

export const showsVideosListSchema = new schema.Entity('showsVideosList', {
  results: [showsVideosSchema]
})

export const flicksReviewsSchema = new schema.Entity('flicksReviews')

export const flicksReviewsListSchema = new schema.Entity('flicksReviewsList', {
  results: [flicksReviewsSchema]
})

export const showsReviewsSchema = new schema.Entity('showsReviews')

export const showsReviewsListSchema = new schema.Entity('showsReviewsList', {
  results: [showsReviewsSchema]
})
