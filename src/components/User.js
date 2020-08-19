import React, {Component} from 'react'
import {connect} from 'react-redux'

class User extends Component {
  render() {
    const {user} = this.props
    const questionsAnswered = Object.keys(user.answers).length
    console.log(Object.keys(user.answers))

    return (
      <div>
        <div className='tweet'>
          <img
            src={user.avatarURL}
            alt={`Avatar of ${user.name}`}
            className='avatar-question-3'
          />
          <h3>{user.name}</h3>
          <p>{user.questions.length} {user.questions.length===1 ? 'Question ' : 'Questions '} Asked</p>
          <p>{questionsAnswered} {questionsAnswered===1 ? 'Question ' : 'Questions '} Answered</p>
        </div>
      </div>
    )
  }

}

function mapStateToProps({ users }, {id}) {
  return {
    user: users[id]
  }
}

export default connect(mapStateToProps)(User)
