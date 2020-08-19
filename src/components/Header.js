import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { withRouter } from 'react-router';

import {setAuthedUser} from '../actions/authUser'

class Header extends Component {

  handleLogout=(e) => {
    e.preventDefault()
    this.props.history.push(`/`)
    this.props.dispatch(setAuthedUser(''))
  }

  render() {
    const {currentUser} = this.props

    return (
      <div>
        {currentUser &&
        <div>
          <div className='header-right'>
            <ul>
              <li>
                <img
                  src={currentUser.avatarURL}
                  alt={`Avatar of ${currentUser.name}`}
                  className='avatar-header'
                />
              </li>
              <li>
                {currentUser.name}
              </li>
              <li>
                <button className='replying-to' onClick={this.handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
          <nav className='nav'>
            <ul>
              <li>
                <NavLink to='/' exact activeClassName='active'>Home</NavLink>
              </li>
              <li>
                <NavLink to='/new' exact activeClassName='active'>Create Question</NavLink>
              </li>
              <li>
                <NavLink to='/leaderboard' exact activeClassName='active'>Leaderboard</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    currentUser: users[authedUser] ? users[authedUser] : null
  }
}

export default withRouter(connect(mapStateToProps)(Header))
