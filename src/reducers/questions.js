import {RECEIVE_QUESTIONS, ANSWER_QUESTION, CREATE_QUESTION} from '../actions/questions'

export default function questions (state={}, action) { // default state param is empty obj
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return { // merge received tweets onto new obj
        ...state, // spread operator
        ...action.questions
      }
    case ANSWER_QUESTION:
      return {
        ...state,
          [action.qid]: {
            ...state[action.qid],
			        [action.answer]: {
			        	...state[action.qid][action.answer],
			            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                }
            }
      }
    case CREATE_QUESTION:
      return {
        ...state,
          [action.question.id]: action.question
      }
    default:
    return state
  }
}
