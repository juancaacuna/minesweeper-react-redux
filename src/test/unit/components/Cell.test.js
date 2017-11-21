import React from 'react'
import * as enzyme from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Cell from '../../../components/Cell'

const EnzymeAdapter = require('enzyme-adapter-react-16')
enzyme.configure({ adapter: new EnzymeAdapter() })

const info = {
  hasMine: false,
  hasFlag: false,
  isOpened: false,
  minesAround: 2,
}

let gridRowCount = 3

describe('Cell', () => {
  it('should render', () => {
    enzyme.shallow(
      <Cell info={info} gridRowCount={gridRowCount} />,
    )
  })

  it('renders a `.cell-closed`', () => {
    const wrapper = enzyme.mount(<Cell info={info} gridRowCount={gridRowCount} />)
    expect(wrapper.find('.cell-closed')).to.have.length(1)
  })

  it('renders a `.cell-flag`', () => {
    info.hasFlag = true
    const wrapper = enzyme.mount(<Cell info={info} gridRowCount={gridRowCount} />)
    expect(wrapper.find('.cell-flag')).to.have.length(1)
    info.hasFlag = false
  })

  it('renders a `.cell-number`', () => {
    info.isOpened = true
    const wrapper = enzyme.mount(<Cell info={info} gridRowCount={gridRowCount} />)
    expect(wrapper.find('.cell-number')).to.have.length(1)
  })

  it('renders a `.cell-empty`', () => {
    info.minesAround = 0
    const wrapper = enzyme.mount(<Cell info={info} gridRowCount={gridRowCount} />)
    expect(wrapper.find('.cell-empty')).to.have.length(1)
  })

  it('renders a `.cell-bomb`', () => {
    info.hasMine = true
    const wrapper = enzyme.mount(<Cell info={info} gridRowCount={gridRowCount} />)
    expect(wrapper.find('.cell-bomb')).to.have.length(1)
  })

  it('renders a `.cell-size-3`', () => {
    gridRowCount = 19
    const wrapper = enzyme.mount(<Cell info={info} gridRowCount={gridRowCount} />)
    expect(wrapper.find('.cell-size-3')).to.have.length(1)
  })

  it('renders a `.cell-size-4`', () => {
    gridRowCount = 14
    const wrapper = enzyme.mount(<Cell info={info} gridRowCount={gridRowCount} />)
    expect(wrapper.find('.cell-size-4')).to.have.length(1)
  })

  it('renders a `.cell-size-7`', () => {
    gridRowCount = 8
    const wrapper = enzyme.mount(<Cell info={info} gridRowCount={gridRowCount} />)
    expect(wrapper.find('.cell-size-7')).to.have.length(1)
  })

  it('renders a `.cell-size-10`', () => {
    gridRowCount = 3
    const wrapper = enzyme.mount(<Cell info={info} gridRowCount={gridRowCount} />)
    expect(wrapper.find('.cell-size-10')).to.have.length(1)
  })

  it('simulates open-cell event', () => {
    const openCellClick = sinon.spy()
    const wrapper = enzyme.mount(
      <Cell info={info}
        gridRowCount={gridRowCount}
        flagToggle={false}
        openCell={openCellClick}
      />
    )
    wrapper.find('#cell-wrapper').simulate('click')
    expect(openCellClick).to.have.property('callCount', 1)
  })

  it('simulates flag-cell event', () => {
    const flagCellClick = sinon.spy()
    const wrapper = enzyme.mount(
      <Cell info={info}
        gridRowCount={gridRowCount}
        flagToggle={true}
        flagCell={flagCellClick}
      />
    )
    wrapper.find('#cell-wrapper').simulate('click')
    expect(flagCellClick).to.have.property('callCount', 1)
  })
})