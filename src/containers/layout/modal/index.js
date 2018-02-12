import React, { Component} from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import * as modalActions from '~/actions/modal'
import * as userActions from '~/actions/user'

import Login from '@/layout/modal/Login'
import SignUp from '@/layout/modal/SignUp'

class Modal extends Component {

    constructor(props){
        super(props)
        
    }

    renderDialog(){
        let {
            modal,
            showLogin,
            showSignUp,
            hideModal,
            updateUserData
            }=this.props
        
        if(modal.isLoginDialogVisible){
            return  <Login showSignUp={showSignUp} hideModal={hideModal} updateUserData={updateUserData}/>
        }  

        if(modal.isSignUpDialogVisible){
            return  <SignUp showLogin={showLogin} hideModal={hideModal} updateUserData={updateUserData}/>
        }  
    }

    render() {
        let {
            modal,
            hideModal
            }=this.props
        
        let isModalActive=modal.isLoginDialogVisible || modal.isSignUpDialogVisible

        return (
        <div className={classnames("modal",{"active":isModalActive})} onClick={()=>{ hideModal() }} >
          
            <div className="modal_dialog" onClick={(e)=>{ e.stopPropagation() }}>
                <div className="modal_header">
                    <i
                        onClick={()=>{ hideModal() }} 
                        className="fa fa-times" 
                        aria-hidden="true"
                        />
                </div>
                
                {this.renderDialog()}
            </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    let {modal}=state

	return {
        modal
    }
}

function mapDispatchToProps(dispatch) {
	return {
        showLogin:()=> dispatch(modalActions.showLoginModal()),
        showSignUp:()=> dispatch(modalActions.showSignUpModal()),
        hideModal:()=> dispatch(modalActions.hideModal()),
        updateUserData:()=>dispatch(userActions.updateUser())
	}
}

function dispathLoadData(dispatch) {

}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)