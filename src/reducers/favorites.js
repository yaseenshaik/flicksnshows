import { TOGGLE_FAVORITE } from '../actions/favorites'

const favorites = (
  state = {
    flicks: {},
    shows: {}
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const { mediaType, id } = action
      const key = mediaType + 's'
      const update = { ...state[key] }

      if (state[key][id] === true) {
        delete update[id]
      } else {
        update[id] = true
      }

      return {
        ...state,
        [key]: update
      }
    default:
      return state
  }
}

export default favorites
