import * as actionTypes from '../../../actions/actionTypes'
import * as gameStatus from '../../../lib/gameStatus'
import recordsReducer from '../../../reducers/recordsReducer'

describe('recordsReducer', () => {
  it('should return user when action type is FETCH_RECORDS_SUCCESS', () => {
    const expected = [{ recordId: 1 }, { recordId: 2 }]
    const state = recordsReducer(null, { type: actionTypes.FETCH_RECORDS_SUCCESS, records: expected })
    expect(state).toEqual(expected)
  })

  it('should return null when action type is FETCH_RECORDS_ERROR', () => {
    const state = recordsReducer(null, { type: actionTypes.FETCH_RECORDS_ERROR })
    expect(state).toEqual(null)
  })

})