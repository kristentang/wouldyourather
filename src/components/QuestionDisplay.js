import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

class QuestionDisplay extends Component {
  render() {
    const {question} = this.props

    return (
      <div>
        <div className='tweet-info'>
        <Link to={`/question/${question.id}`}className='tweet'>
          Would you rather...&nbsp;<b>{question.optionOne.text}</b>&nbsp;or&nbsp;<b>{question.optionTwo.text}</b>?
        </Link>
        </div>
      </div>
    )
  }

}

function mapStateToProps({ questions }, {id}) {
  const question = questions[id]
  return {
    question
  }
}

export default withRouter(connect(mapStateToProps)(QuestionDisplay))
