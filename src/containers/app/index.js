import React, { Component} from 'react'
import { withRouter} from 'react-router'
import { connect } from 'react-redux'

import * as modalActions from '~/actions/modal'
import * as userActions from '~/actions/user'

import Header from '@/layout/Header';
import Main from '@/layout/Main';
import Footer from '@/layout/Footer';

import Modal from '&/layout/modal';


class App extends Component {

    constructor(props){
        super(props)
       
        props.loadUserData()
    }


    render() {
        let {user, showLogin, showSignUp}=this.props

        let isUserLogged=(user!==null)

        return (
        <div className="container">
            <Header 
                user={user}
                showSignUp={showSignUp} 
                showLogin={showLogin}
                />

            <Main isUserLogged={isUserLogged}/>
            <Footer/>
            <Modal/>
        </div>
        )
    }
}

function mapStateToProps(state) {
    let {user}=state

	return {user}
}

function mapDispatchToProps(dispatch) {
	return {
        showLogin:()=> dispatch(modalActions.showLoginModal()),
        showSignUp:()=> dispatch(modalActions.showSignUpModal()),
        loadUserData:()=>dispatch(userActions.updateUser())
	}
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App) )