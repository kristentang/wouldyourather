import API from 'goals-todos-api'

export const ADD_GOAL = "ADD_GOAL"
export const REMOVE_GOAL = "REMOVE_GOAL"

function displayErrorMessage() {
  return alert('An error occured. Try again.')
}

// Action Creators
function addGoal(goal) {
  return {
    type: ADD_GOAL,
    goal
  }
}

function removeGoal(id) {
  return {
    type: REMOVE_GOAL,
    id
  }
}

// Asynch Action Creators
export function handleAddGoal (name, cb) {
  return (dispatch) => {
    return API.saveGoal(name)
      .then((goal) => {
        dispatch(addGoal(goal))
        cb()
      })
      .catch(() => displayErrorMessage())
  }
}

export function handleDeleteGoal (goal) {
  return (dispatch) => {
    dispatch(removeGoal(goal.id))

    return API.deleteGoal(goal.id)
      .catch(() => {
        dispatch(addGoal(goal))
        displayErrorMessage()
      })
  }
}
