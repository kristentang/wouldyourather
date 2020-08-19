import React from 'react'
import List from './List'
import {connect} from 'react-redux'
import {
  handleAddTodo,
  handleDeleteTodo,
  handleToggleTodo
} from '../actions/todos'

class Todos extends React.Component {
  addItem = (e) => {
    e.preventDefault()

    this.props.dispatch(handleAddTodo( // from store
      this.input.value,
      () => this.input.value = ''
    ))
  }

  removeItem = (todo) => {
    this.props.dispatch(handleDeleteTodo(todo)) // from store
  }

  toggleItem = (id) => {
    this.props.dispatch(handleToggleTodo(id)) // from store
  }

  render () {
    const {store, todos} = this.props
    return (
      <div>
        <h1>Todo List</h1>
        <input
          type='text'
          placeholder='Add Todo'
          ref={(input) => this.input = input}
        />
        <button onClick={this.addItem}>Add Todo</button>
        <List
          items={todos}
          remove={this.removeItem}
          toggle={this.toggleItem}/>
      </div>
    )
  }
}

export default connect((state) => ({ // connect is from import
  todos: state.todos
}))(Todos) // Component we want to render
