import {RECEIVE_USERS, ANSWER_QUESTION_USER, CREATE_QUESTION_USER} from '../actions/users'

export default function users (state={}, action) { // default state param is empty obj
  switch(action.type) {
    case RECEIVE_USERS:
      return { // merge received users onto new obj
        ...state, // spread operator
        ...action.users
      };
    case ANSWER_QUESTION_USER:
      return {
        ...state, // piece of the state is users
          [action.authedUser]:  {
          ...state[action.authedUser],
            answers : {
              ...state[action.authedUser].answers,
                [action.qid] :action.answer
            }
          }
        };
    case CREATE_QUESTION_USER:
      return {
        ...state,
          [action.question.author]: {
            ...state[action.question.author],
              questions: state[action.question.author].questions.concat([action.question.id])
        }
      };
    default:
      return state
  }
}
