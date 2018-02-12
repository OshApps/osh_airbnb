import {SHOW_MODAL_ACTION, HIDE_MODAL_ACTION, LOGIN_DIALOG, SIGNUP_DIALOG} from "$/modal"

export const showLoginModal= ()=> ( {type: SHOW_MODAL_ACTION, dialog: LOGIN_DIALOG} )

export const showSignUpModal= ()=> ( {type: SHOW_MODAL_ACTION, dialog: SIGNUP_DIALOG} )

export const hideModal= ()=> ( {type: HIDE_MODAL_ACTION} )




