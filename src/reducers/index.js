import {combineReducers} from 'redux'
import {loadingBarReducer} from 'react-redux-loading'

// import reducers
import authedUser from './authUser'
import users from './users'
import questions from './questions'

export default combineReducers({
  authedUser, users, questions, loadingBar: loadingBarReducer
})
