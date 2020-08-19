import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

import Error from './Error'
import {handleAnswerQuestion} from '../actions/shared'

class QuestionInteractive extends Component {
  handleOptionOne=(e) => {
    e.preventDefault()
    const {question, dispatch, authedUser} = this.props
    dispatch(handleAnswerQuestion({
      authedUser,
      qid: question.id,
      answer: 'optionOne'
    }))
  }

  handleOptionTwo=(e) => {
    e.preventDefault()
    const {question, dispatch, authedUser} = this.props
    dispatch(handleAnswerQuestion({
      authedUser,
      qid: question.id,
      answer: 'optionTwo'
    }))
  }

  render() {
    const {question, author, currentUser} = this.props

    if (question===undefined) {
      return (
        <Error />
      )
    }

    const optionOneCount = question.optionOne.votes.length
    const optionTwoCount = question.optionTwo.votes.length

    return (
      <div>
        <h3 className='center'>
          <img
            src={author.avatarURL}
            alt={`Avatar of ${author.name}`}
            className='avatar-question'
          />
          WOULD YOU RATHER?
        </h3>
        <br />
        {(question.optionOne.votes.includes(currentUser.id) || question.optionTwo.votes.includes(currentUser.id))
          ?
          <ul className='dashboard-list'>
            <div className='tweet'>
              <h3>{question.optionOne.text}&nbsp;</h3>
              <p>{optionOneCount} {optionOneCount===1 ? 'Vote' : 'Votes'}, {(optionOneCount/(optionOneCount+optionTwoCount))*100}%</p>
              {question.optionOne.votes.includes(currentUser.id) &&
                <img
                  src={currentUser.avatarURL}
                  alt={`Avatar of ${author.name}`}
                  className='avatar-question-2'
                />
              }
            </div>
            <br />
            <div className='tweet'>
              <h3>{question.optionTwo.text}</h3>
              <br />
              <p>{optionTwoCount} {optionTwoCount===1 ? 'Vote' : 'Votes'}, {(optionTwoCount/(optionOneCount+optionTwoCount))*100}%</p>
              {question.optionTwo.votes.includes(currentUser.id) &&
                <img
                  src={currentUser.avatarURL}
                  alt={`Avatar of ${author.name}`}
                  className='avatar-question-2'
                />
              }
            </div>
          </ul>
          :
          <ul className='dashboard-list'>
            <div className='tweet-info'>
              <button onClick={this.handleOptionOne}>{question.optionOne.text}</button>
              <p>or</p>
              <button onClick={this.handleOptionTwo}>{question.optionTwo.text}</button>
            </div>
          </ul>
        }
      </div>

    )
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const {id} = props.match.params
  const question = questions[id]

  return {
    question,
    author: question!==undefined ? users[question.author] : null,
    currentUser: users[authedUser],
    authedUser
  }
}

export default connect(mapStateToProps)(QuestionInteractive)
