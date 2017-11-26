import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import * as actionTypes from '../../../actions/actionTypes'
import * as recordsActions from '../../../actions/recordsActions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

describe('recordsActions', () => {
  afterEach(() => {
    store.clearActions()
  })

  it('should dispatch fetchRecords success action', () => {
    const store = mockStore()
    const expectedActions = [
      { type: actionTypes.FETCH_RECORDS },
      { type: actionTypes.FETCH_RECORDS_SUCCESS, records: [] },
    ]

    fetchMock.post('*', { data: { records: [] }})

    return store.dispatch(recordsActions.fetchRecords())
      .then(() => { expect(store.getActions()).toEqual(expectedActions) })
  })

  it('should dispatch putRecord success action', () => {
    const store = mockStore()
    const record = { recordId: 1 }
    const user = { userId: 1, email: 'jcarlos323@hotmail.com' }
    const expectedActions = [
      { type: actionTypes.PUT_RECORD, record, user },
      { type: actionTypes.PUT_RECORD_SUCCESS },
      { type: actionTypes.FETCH_RECORDS },
      { type: actionTypes.FETCH_RECORDS_SUCCESS, records: [] },
    ]

    fetchMock.put('*', record)

    return store.dispatch(recordsActions.putRecord(record, 0, user))
      .then(() => { expect(store.getActions()).toEqual(expectedActions) })
  })
})
