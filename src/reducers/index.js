import { combineReducers } from 'redux'
import minesGridReducer from './minesGridReducer'

const appReducer = combineReducers({
  minesGrid: minesGridReducer,
})

export default (state, action) => {
  return appReducer(state, action);
}