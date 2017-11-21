import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as enzyme from 'enzyme'
import Grid from '../../../components/Grid'

const EnzymeAdapter = require('enzyme-adapter-react-16')

const mockStore = configureMockStore([thunk])
const store = mockStore({
  minesGrid: {
    RowCount: 0
  }
})

enzyme.configure({ adapter: new EnzymeAdapter() })

describe('Grid', () => {
  it('should render', () => {
    enzyme.shallow(
      <Grid store={store}/>,
    );
  });
});
