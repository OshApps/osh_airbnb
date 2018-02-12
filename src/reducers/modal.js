
export const SHOW_MODAL_ACTION="SHOW_MODAL"
export const HIDE_MODAL_ACTION="HIDE_MODAL"

export const LOGIN_DIALOG="login"
export const SIGNUP_DIALOG="signup"

var defaultModal={
  isLoginDialogVisible:false, 
  isSignUpDialogVisible:false
}

export default (state = defaultModal, action)=> {

  switch (action.type) {
    
    case SHOW_MODAL_ACTION:
      let dialogState=getDialogState(action.dialog)
      return {...defaultModal, ...dialogState}

    case HIDE_MODAL_ACTION:
      return defaultModal

    default:
      return state
  }
}

function getDialogState(dialog){

  switch (dialog) {
    
    case LOGIN_DIALOG:
      return {isLoginDialogVisible:true}

    case SIGNUP_DIALOG:
      return {isSignUpDialogVisible:true}

    default:
      return null
  }
}