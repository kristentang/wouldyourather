import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {handleCreateQuestion} from '../actions/shared'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  }

  handleChangeOptionOne = (e) => {
    const optionOne = e.target.value
    this.setState(() => ({
      optionOne: optionOne
    }))
  }

  handleChangeOptionTwo = (e) => {
    const optionTwo = e.target.value
    this.setState(() => ({
      optionTwo: optionTwo
    }))
  }

  handleSubmit =(e) => {
    e.preventDefault()

    const{optionOne, optionTwo} = this.state
    const {dispatch, authedUser} = this.props

    dispatch(handleCreateQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    }))

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
    }))
    this.props.history.push(`/`)
  }

  render() {
    const {authedUser} = this.props
    const {optionOne, optionTwo} = this.state

    return (
      <div className='center'>
        <h3>CREATE QUESTION</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
              placeholder="Option 1"
              value={optionOne}
              onChange={this.handleChangeOptionOne}
              className='textarea'
          />
          <br />
          <textarea
              placeholder="Option 2"
              value={optionTwo}
              onChange={this.handleChangeOptionTwo}
              className='textarea'
          />
          <button
            className='btn'
            type='submit'
            disabled={optionOne.length===0 || optionTwo.length===0}>
            Submit
          </button>
        </form>
      </div>
    )
  }

}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)
