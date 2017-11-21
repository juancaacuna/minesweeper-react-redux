import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actionTypes from '../../../actions/actionTypes'
import * as minesGridActions from '../../../actions/minesGridActions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

describe('minesGridActions', () => {
  afterEach(() => {
    store.clearActions()
  })

  it('should dispatch initMinesGrid success action', () => {
    const expectedActions = [
      { type: actionTypes.INIT_MINES_GRID, colCount: 10, rowCount:10 },
    ]

    store.dispatch(minesGridActions.initMinesGrid(10, 10))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should dispatch openCell success action', () => {
    const expectedActions = [
      { type: actionTypes.OPEN_CELL, cell: {} },
    ]

    store.dispatch(minesGridActions.openCell({}))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should dispatch flagCell success action', () => {
    const expectedActions = [
      { type: actionTypes.FLAG_CELL, cell: {} },
    ]

    store.dispatch(minesGridActions.flagCell({}))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should dispatch toggleFlag success action', () => {
    const expectedActions = [
      { type: actionTypes.FLAG_TOGGLE },
    ]

    store.dispatch(minesGridActions.toggleFlag())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
