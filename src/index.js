import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './reducers'
import './index.css'

const logger = createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error  })

// redux related book keeping
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // allow us to dispatch() functions
      logger
    )
  )
  return createStore(rootReducer, initialState, enhancer)
}

const store = configureStore({})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()