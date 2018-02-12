
export const SET_USER_ACTION="SET_USER"

export default (state = null, action)=> {

  switch (action.type) {
    
    case SET_USER_ACTION:
      return action.user || null

    default:
      return state
  }
}
