import {getInitialData, saveQuestion, saveQuestionAnswer} from '../utils/api'

// import action creators
import {receiveUsers, answerQuestionUser, createQuestionUser} from '../actions/users'
import {receiveQuestions, answerQuestion, createQuestion} from '../actions/questions'
import {setAuthedUser} from '../actions/authUser'
import {showLoading, hideLoading} from 'react-redux-loading'

const AUTHED_ID = '' // hard coded authed_id, default value

export function handleInitialData() {
  return (dispatch) => { // thunk pattern
    dispatch(showLoading())
    return getInitialData() // returns promise with object containing users + questions properties
      .then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}

export function handleCreateQuestion (info) {
  return (dispatch, getState) => {
    const {authedUser} = getState()
    dispatch(showLoading())
    return saveQuestion(info)
      .then((result) => {
        dispatch(createQuestion(result))
        dispatch(createQuestionUser(result))
        dispatch(hideLoading())
      })
      .catch((e) => {
        alert('There was an error saving the question. Try again.')
        dispatch(hideLoading())
      })
  }
}

export function handleAnswerQuestion (info) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestionAnswer(info)
      .catch((e) => {
        dispatch(answerQuestion(info))
        dispatch(answerQuestionUser(info))
        alert('There was an error answering the question. Try again.')
        dispatch(hideLoading())
      })
      .then(() => {
        dispatch(answerQuestion(info))
        dispatch(answerQuestionUser(info))
        dispatch(hideLoading())
      })
  }
}
