import React from 'react'
import { connect } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as enzyme from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Header from '../../../components/Header'
import * as gameStatus from '../../../lib/gameStatus'

const EnzymeAdapter = require('enzyme-adapter-react-16')

const mockStore = configureMockStore([thunk])
let store = mockStore({
  minesGrid: {
    GameStatus: gameStatus.NEW,
    FlagToggle: false,
  }
})

const mapStateToProps = (state) => ({
  state,
})

enzyme.configure({ adapter: new EnzymeAdapter() })

describe('Header', () => {
  it('should render', () => {
    enzyme.shallow(<Header store={store}/>)
  })

  it('renders a `.gray-filter`', () => {
    const wrapper = enzyme.mount(<Header store={store} />)
    expect(wrapper.find('.gray-filter')).to.have.length(1)
  })

  it('do not renders a `.gray-filter`', () => {
    store = mockStore({
      minesGrid: {
        FlagToggle: true
      }
    })
    const wrapper = enzyme.mount(<Header store={store} />)
    expect(wrapper.find('.gray-filter')).to.have.length(0)
  })

  it('renders a `.header-time-small`', () => {
    store = mockStore({
      minesGrid: {
        RowCount: 5
      }
    })
    const wrapper = enzyme.mount(<Header store={store} />)
    expect(wrapper.find('.header-time-small')).to.have.length(1)
  })
})