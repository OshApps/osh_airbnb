import React, { Component} from 'react'
import classnames from "classnames"

import fetchHelper from '~/utils/fetchHelper';
import {USER_SIGN_UP_URL} from '~/consts/urls';


export default class SignUp extends Component {

    constructor(props){
        super(props)
        
        this.state={}

        this.onSubmit=this.onSubmit.bind(this)
    }

    onSubmit(event){
        event.preventDefault()

        let {updateUserData, hideModal}=this.props

        let firstName=this.firstNameInput.value
        let lastName=this.lastNameInput.value
        let email=this.emailInput.value
        let password=this.passwordInput.value
        
        fetchHelper.post(USER_SIGN_UP_URL, {firstName, lastName, email, password})
            .then((result)=>{
                let {error, isSucceed}=result

                debugger

                if(!isSucceed){
                    this.setState({error}) 
                    return
                }

            updateUserData()    
            hideModal()     
            })
    }

    render() {
        let {showLogin}=this.props
        let {error}=this.state

        error= error || {};

        return (
        <div className="modal_body">
            <div className="title"> 
                Sign up
            </div>

            <form className="form" onSubmit={this.onSubmit}>
                <div className={ classnames("form_group", {"error":error.email !== undefined} ) }>
                    <div className="input_wrap">
                        <i className="fa fa-envelope-o" aria-hidden="true"/>
                        <input 
                            ref={(element)=> {this.emailInput=element}}
                            type="email" 
                            placeholder="Email address" 
                            required
                            />
                    </div>

                    <span className="error_massage">
                        { error.email || "" }
                    </span>
                </div>

                <div className={ classnames("form_group", {"error":error.firstName !== undefined} ) }>
                    <div className="input_wrap">
                        <i className="fa fa-user-o" aria-hidden="true"/>
                        <input 
                            ref={(element)=> {this.firstNameInput=element}}
                            type="text" 
                            placeholder="First name" 
                            required
                            />
                    </div>

                    <span className="error_massage">
                        { error.firstName || "" }
                    </span>

                </div>

                <div className={ classnames("form_group", {"error":error.lastName !== undefined} ) }>
                    <div className="input_wrap">
                        <i className="fa fa-user-o" aria-hidden="true"/>
                        <input 
                            ref={(element)=> {this.lastNameInput=element}}
                            type="text" 
                            placeholder="Last name" 
                            required
                            />
                    </div>

                    <span className="error_massage">
                        { error.lastName || "" }
                    </span>
                </div>

                <div className={ classnames("form_group", {"error":error.password !== undefined} ) }>
                    <div className="input_wrap">
                        <i className="fa fa-lock" aria-hidden="true"/>
                        <input 
                            ref={(element)=> {this.passwordInput=element}}
                            type="password" 
                            placeholder="Create a Password"
                            minLength="6" 
                            maxLength="20" 
                            required 
                            />
                    </div>

                    <span className="error_massage">
                        { error.password || "" }
                    </span>
                </div>

                <input type="submit" className="button" defaultValue="Sign up"/>
            </form>

            <div className="footer">
                <span className="message">
                    Already have an Airbnb account? 
                </span>

                <span className="txt_btn" onClick={()=> showLogin()}>
                    Log in
                </span>
            </div>
            
        </div>
        )
    }
}
