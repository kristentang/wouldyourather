import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {setAuthedUser} from '../actions/authUser'

class Login extends Component {

  selectUser = (selectedUser) => {
    this.props.dispatch(setAuthedUser(selectedUser))
  }

  render() {
    const {userInfo} = this.props
    return (
      <div>
        <h3 className="center">WOULD YOU RATHER?</h3>
        <br />
        <h2 className="center">LOGIN</h2>
        <br />
        <div className='drop-down'>
          <select onChange={(event) => this.selectUser(event.target.value)} defaultValue='default'>
            <option disabled key='default' value='default'>Select User</option>
            {userInfo.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}

function mapStateToProps({users}) {
  return {
    userInfo: Object.values(users)
  }
}

export default connect(mapStateToProps)(Login)
