import * as actionTypes from '../actions/actionTypes'

export default function (state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_RECORDS_SUCCESS: {
      return action.records || []
    }
    case actionTypes.FETCH_RECORDS_ERROR: {
      return null
    }
    default: return state
  }
}
