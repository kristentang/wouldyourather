import API from 'goals-todos-api'

export const RECEIVE_DATA = "RECEIVE_DATA"

function receiveData (todos, goals) {
  return {
    type: RECEIVE_DATA,
    todos,
    goals
  }
}

export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([ // waits until all Promises have resolved before displaying asynchronous requests
      API.fetchTodos(), // returns a Promise() object
      API.fetchGoals()
    ]).then(([todos, goals]) => {
      console.log(todos, goals);
      dispatch(receiveData(todos, goals))
    })

  }
}
