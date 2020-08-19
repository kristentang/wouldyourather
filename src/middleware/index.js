import thunk from 'redux-thunk'
import {applyMiddleware} from 'redux'

import logger from './logger'

export default applyMiddleware(thunk, logger) // called in order listed - thunk takes functions and executes them, this order allows logging of actions themselves
