import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as enzyme from 'enzyme'
import Records from '../../../components/Records'
import { wrap } from 'module'

const EnzymeAdapter = require('enzyme-adapter-react-16')

const mockStore = configureMockStore([thunk])
const store = mockStore({
  minesGrid: {
    RowCount: 0,
    GameStatus: 'new',
    TimeAchieved: 0
  },
  records: [],
  form: {}
})

enzyme.configure({ adapter: new EnzymeAdapter() })

describe('Records', () => {

  it('should render', () => {
    enzyme.shallow(
      <Records store={store}/>,
    )
  })
})
