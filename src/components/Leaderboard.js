import React, {Component} from 'react'
import {connect} from 'react-redux'

import User from './User'

class Leaderboard extends Component {
  render() {
    const { userIds } = this.props
    return (
      <div>
        <h3 className='center'>LEADERBOARD</h3>
        <ul>
          {
            userIds.map((id) => (
              <li key={id}>
                <div>
                  <User id={id} />
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  const userScores = {}
  for (var key in users) {
      if (users.hasOwnProperty(key)) {
          userScores[key] = users[key].questions.length + Object.keys(users[key].answers).length
      }
  }

  return {
    userIds: Object.keys(userScores)
    .sort((a,b) => userScores[b] - userScores[a])
  }
}

export default connect(mapStateToProps)(Leaderboard)
