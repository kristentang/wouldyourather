import API from 'goals-todos-api'

export const ADD_TODO = "ADD_TODO"
export const REMOVE_TODO = "REMOVE_TODO"
export const TOGGLE_TODO = "TOGGLE_TODO"

function displayErrorMessage() {
  return alert('An error occured. Try again.')
}

// Action Creators
function addTodo(todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

// Asynch Action Creators
export function handleAddTodo(name, cb) { // callback function
  return (dispatch) => {
    return API.saveTodo(name)
      .then((todo) => {
        dispatch(addTodo(todo))
        cb()
      })
      .catch(() => displayErrorMessage())
  }
}

export function handleDeleteTodo (todo) {
  return (dispatch) => {
    dispatch(removeTodo(todo))

    return API.deleteTodo(todo.id) // update API
    .catch(() => { // optimistic update: rollback to original state if api returns an error
      dispatch(addTodo(todo))
      displayErrorMessage()
    })
  }
}

export function handleToggleTodo(id) {
  return (dispatch) => {
    dispatch(toggleTodo(id))
    return API.saveTodoToggle(id)
      .catch(() => {
        dispatch(toggleTodo(id))
        displayErrorMessage()
      })
  }
}
