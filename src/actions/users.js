export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ANSWER_QUESTION_USER = 'ANSWER_QUESTION_USER'
export const CREATE_QUESTION_USER = 'CREATE_QUESTION_USER'

export function receiveUsers (users) {
  return { // returns action object
    type: RECEIVE_USERS,
    users
  }
}

export function answerQuestionUser ({ authedUser, qid, answer }) {
  return { // returns action object
    type: ANSWER_QUESTION_USER,
    authedUser,
    qid,
    answer
  }
}

export function createQuestionUser (question) {
  return { // returns action object
    type: CREATE_QUESTION_USER,
    question
  }
}
