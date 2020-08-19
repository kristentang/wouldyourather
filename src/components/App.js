import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoadingBar from 'react-redux-loading'

import Dashboard from './Dashboard';
import Header from './Header';
import QuestionInteractive from './QuestionInteractive'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard';
import Login from './Login';
import {handleInitialData} from '../actions/shared'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const {loading, authedUser} = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {(loading === false && authedUser!=='')
              ? <div>
                <Header />
                <Route path='/' exact component={Dashboard} />
                <Route path='/question/:id' component={QuestionInteractive} />
                <Route path='/new' component={NewQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
              </div>
              : null}
            {(loading === false && authedUser==='')
              ? <div>
                <Login />
              </div>
              : null}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({authedUser}) {
  return {
    loading: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App);
