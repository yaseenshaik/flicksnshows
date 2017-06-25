export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'

export const toggleFavorite = (id, mediaType) => ({
  type: TOGGLE_FAVORITE,
  id,
  mediaType
})
