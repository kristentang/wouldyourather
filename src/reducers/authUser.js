import {SET_AUTHED_USER} from '../actions/authUser'

export default function authedUser (state=null, action) { // default state param is null
  switch(action.type) {
    case SET_AUTHED_USER:
      return action.id
    default:
      return state
  }
}
