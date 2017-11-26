import * as actionTypes from '../../../actions/actionTypes'
import * as gameStatus from '../../../lib/gameStatus'
import userReducer from '../../../reducers/userReducer'

describe('userReducer', () => {
  it('should return user when action type is FETCH_USER_SUCCESS', () => {
    const expected = {
      userId: 1,
      email: 'jcarlos323@hotmail.com',
      country: 'CR'
    }
    const state = userReducer(null, { type: actionTypes.FETCH_USER_SUCCESS, users: [expected] })
    expect(state).toEqual(expected)
  })

  it('should return user when action type is POST_USER_SUCCESS', () => {
    const expected = {
      userId: 1,
      email: 'jcarlos323@hotmail.com',
      country: 'CR'
    }
    const state = userReducer(null, { type: actionTypes.POST_USER_SUCCESS, user: expected })
    expect(state).toEqual(expected)
  })

  it('should return null when action type is FETCH_USER_ERROR', () => {
    const state = userReducer(null, { type: actionTypes.FETCH_USER_ERROR })
    expect(state).toEqual(null)
  })

})