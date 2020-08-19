export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const CREATE_QUESTION = 'CREATE_QUESTION'

export function receiveQuestions (questions) {
  return { // returns action object
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function answerQuestion ({ authedUser, qid, answer }) {
  return { // returns action object
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
}

export function createQuestion (question) {
  return { // returns action object
    type: CREATE_QUESTION,
    question
  }
}
