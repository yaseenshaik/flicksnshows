// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const generateApiReducer = ({ types, mapActionToKey, successReducer }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (successReducer !== undefined && typeof successReducer !== 'function') {
    throw new Error('Expected successReducer to be a function.')
  }

  const [requestType, successType, failureType] = types

  const nextState = (previousState, action) => {
    let state = Object.assign(
      {
        isFetching: false
      },
      previousState
    )
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        }
      case successType:
        if (successReducer) {
          return successReducer(state, action)
        }

        return {
          ...state,
          isFetching: false,
          response: action.response
        }
      case failureType:
        return {
          ...state,
          isFetching: false
        }
      default:
        return state
    }
  }

  return (state = {}, action) => {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        if (typeof mapActionToKey === 'function') {
          const key = mapActionToKey(action)
          if (typeof key !== 'string') {
            throw new Error('Expected key to be a string.')
          }

          return {
            ...state,
            [key]: nextState(state[key], action)
          }
        }

        return nextState(state, action)
      default:
        return state
    }
  }
}

export default generateApiReducer
