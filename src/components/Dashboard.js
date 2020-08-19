import React, {Component} from 'react'
import {connect} from 'react-redux'

import QuestionDisplay from './QuestionDisplay'

class Dashboard extends Component {
  state = {
    questionType: 'unanswered'
  }

  toggleQuestionType = (questionTypeSelection) => {
    this.setState(() => ({
      questionType: questionTypeSelection
    }))
  }

  render() {
    const {unansweredIds, answeredIds} = this.props
    const {questionType} = this.state

    return (
      <div>
        <h3 className='center'>WOULD YOU RATHER?</h3>
        <ul className='dashboard-list'>
          <div className='drop-down'>
            <select onChange={(event) => this.toggleQuestionType(event.target.value)} defaultValue={questionType}>
                <option key='unanswered' value='unanswered'>My unanswered questions</option>
                <option key='answered' value='answered'>My answered questions</option>
            </select>
          </div>
          {
            questionType === 'unanswered'
            ?
              this.props.unansweredIds.map((id) => (
                <li key={id}>
                  <div>
                    <QuestionDisplay id={id} />
                  </div>
                </li>
              ))
            :
              this.props.answeredIds.map((id) => (
                <li key={id}>
                  <div>
                    <QuestionDisplay id={id} />
                  </div>
                </li>
              ))
          }
        </ul>
      </div>
    )
  }

}

function mapStateToProps({ questions, authedUser }) {
  const answeredQuestions = {}
  const unansweredQuestions = {}
  for (var key in questions) {
      if (questions.hasOwnProperty(key)) {
          if ((questions[key].optionOne.votes).includes(authedUser) || (questions[key].optionTwo.votes).includes(authedUser)) {
            answeredQuestions[key] = questions[key]
          } else {
            unansweredQuestions[key] = questions[key]
          }
      }
  }

  return {
    unansweredIds: Object.keys(unansweredQuestions)
    .sort((a,b) => unansweredQuestions[b].timestamp - unansweredQuestions[a].timestamp),
    answeredIds: Object.keys(answeredQuestions)
    .sort((a,b) => answeredQuestions[b].timestamp - answeredQuestions[a].timestamp) // grabs all tweet by their ids, sorts by timestamp
  }
}

export default connect(mapStateToProps)(Dashboard)
