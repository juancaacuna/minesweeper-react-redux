import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import * as actionTypes from '../../../actions/actionTypes'
import * as userActions from '../../../actions/userActions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

describe('userActions', () => {
  afterEach(() => {
    store.clearActions()
  })

  it('should dispatch fetchUser success action', () => {
    const store = mockStore()
    const expectedActions = [
      { type: actionTypes.FETCH_USER, filter: '' },
      { type: actionTypes.FETCH_USER_SUCCESS, users: [] },
    ]

    fetchMock.post('*', { data: { users: [] }})

    return store.dispatch(userActions.fetchUser(''))
      .then(() => { expect(store.getActions()).toEqual(expectedActions) })
  })

  it('should dispatch postUser success action', () => {
    const store = mockStore()
    const expectedActions = [
      { type: actionTypes.POST_USER, user: {} },
      { type: actionTypes.POST_USER_SUCCESS, user: { users: [] } },
    ]

    fetchMock.post('*', {})

    return store.dispatch(userActions.postUser({}))
      .then(() => { expect(store.getActions()).toEqual(expectedActions) })
  })
})
