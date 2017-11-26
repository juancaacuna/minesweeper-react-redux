import * as actionTypes from '../actions/actionTypes'

export default function (state = null, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS: {
      return action.users && action.users.length > 0 && action.users[0]
    }
    case actionTypes.POST_USER_SUCCESS: {
      return action.user
    }
    case actionTypes.FETCH_USER_ERROR: {
      return null
    }
    default: return state
  }
}
