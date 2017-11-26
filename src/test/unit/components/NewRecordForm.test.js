import React from 'react'
import * as enzyme from 'enzyme'
import NewRecordForm from '../../../components/NewRecordForm'

const EnzymeAdapter = require('enzyme-adapter-react-16')

enzyme.configure({ adapter: new EnzymeAdapter() })

describe('NewRecordForm', () => {
  it('should render', () => {
    enzyme.shallow(<NewRecordForm handleSubmit={() => {}} />)
  })
})
