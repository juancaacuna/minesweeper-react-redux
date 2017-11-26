import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import minesGridReducer from './minesGridReducer'
import recordsReducer from './recordsReducer'
import userReducer from './userReducer'

const appReducer = combineReducers({
  form: formReducer,
  minesGrid: minesGridReducer,
  records: recordsReducer,
  user: userReducer,
})

export default (state, action) => {
  return appReducer(state, action);
}