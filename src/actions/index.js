import { CALL_API } from '../middleware/api'
import {
  showSchema,
  flickSchema,
  flicksVideosListSchema,
  showsVideosListSchema,
  flicksReviewsListSchema,
  showsReviewsListSchema
} from '../schemas'
import { apiBaseUrl, tmdbApiKey } from '../constants'

export const DETAILS_REQUEST = 'DETAILS_REQUEST'
export const DETAILS_SUCCESS = 'DETAILS_SUCCESS'
export const DETAILS_FAILURE = 'DETAILS_FAILURE'
export const VIDEOS_REQUEST = 'VIDEOS_REQUEST'
export const VIDEOS_SUCCESS = 'VIDEOS_SUCCESS'
export const VIDEOS_FAILURE = 'VIDEOS_FAILURE'
export const REVIEWS_REQUEST = 'REVIEWS_REQUEST'
export const REVIEWS_SUCCESS = 'REVIEWS_SUCCESS'
export const REVIEWS_FAILURE = 'REVIEWS_FAILURE'

const getParamType = mediaType => (mediaType === 'flick' ? 'movie' : 'tv')

const fetchDetails = (id, mediaType) => {
  const paramType = getParamType(mediaType)
  const schema = mediaType === 'flick' ? flickSchema : showSchema

  return {
    [CALL_API]: {
      types: [DETAILS_REQUEST, DETAILS_SUCCESS, DETAILS_FAILURE],
      endpoint: `${apiBaseUrl}/${paramType}/${id}?api_key=${tmdbApiKey}`,
      schema
    },
    mediaType,
    id
  }
}

export const loadDetails = (id, mediaType) => (dispatch, getState) => {
  return dispatch(fetchDetails(id, mediaType))
}

const fetchVideos = (id, mediaType) => {
  const paramType = getParamType(mediaType)
  const schema = mediaType === 'flick'
    ? flicksVideosListSchema
    : showsVideosListSchema

  return {
    [CALL_API]: {
      types: [VIDEOS_REQUEST, VIDEOS_SUCCESS, VIDEOS_FAILURE],
      endpoint: `${apiBaseUrl}/${paramType}/${id}/videos?api_key=${tmdbApiKey}`,
      schema
    },
    mediaType,
    id
  }
}

export const loadVideos = (id, mediaType) => (dispatch, getState) => {
  return dispatch(fetchVideos(id, mediaType))
}

const fetchReviews = (id, mediaType) => {
  const paramType = getParamType(mediaType)
  const schema = mediaType === 'flick'
    ? flicksReviewsListSchema
    : showsReviewsListSchema

  return {
    [CALL_API]: {
      types: [REVIEWS_REQUEST, REVIEWS_SUCCESS, REVIEWS_FAILURE],
      endpoint: `${apiBaseUrl}/${paramType}/${id}/reviews?api_key=${tmdbApiKey}`,
      schema
    },
    mediaType,
    id
  }
}

export const loadReviews = (id, mediaType) => (dispatch, getState) => {
  return dispatch(fetchReviews(id, mediaType))
}

