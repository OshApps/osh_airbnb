import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import rootReducer from '~/reducers'

const middleware = applyMiddleware(reduxThunk)

const init={ }

export default createStore(rootReducer, init ,middleware)