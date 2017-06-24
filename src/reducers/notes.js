import { PUT_NOTE } from '../actions/notes'

const notes = (state = {}, action) => {
  switch (action.type) {
    case PUT_NOTE:
      return {
        ...state,
        [`${action.mediaType}_${action.id}`]: action.note
      }
    default:
      return state
  }
}

export default notes
