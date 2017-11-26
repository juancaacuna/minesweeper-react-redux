import React from 'react'
import * as enzyme from 'enzyme'
import RecordsRow from '../../../components/RecordsRow'

const EnzymeAdapter = require('enzyme-adapter-react-16')

enzyme.configure({ adapter: new EnzymeAdapter() })

const record = {
  recordId: '',
  level: '',
  seconds: 0,
  user: '',
  country: ''
}

describe('RecordsRow', () => {
  it('should render', () => {
    enzyme.shallow(<RecordsRow record={record} />)
  })
})
