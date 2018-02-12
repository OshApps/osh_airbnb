import React, { Component} from 'react'
import classnames from "classnames"

import fetchHelper from '~/utils/fetchHelper';
import {USER_LOGIN_URL} from '~/consts/urls';


export default class Login extends Component {

    constructor(props){
        super(props)
        
        this.state={}

        this.onSubmit=this.onSubmit.bind(this)
    }

    onSubmit(event){
        event.preventDefault()

        let {updateUserData, hideModal}=this.props

        let email=this.emailInput.value
        let password=this.passwordInput.value
        
        fetchHelper.post(USER_LOGIN_URL, {email, password})
            .then((result)=>{
                let {error, isSucceed}=result

                if(!isSucceed){
                    this.setState({error}) 
                    return
                    }

                updateUserData()    
                hideModal()    
            })
    }

    render() {
        let {showSignUp}=this.props
        let {error}=this.state

        error= error || {};

        return (
        <div className="modal_body">
            <div className="title"> 
                Log in
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
                
                <div className={ classnames("form_group", {"error":error.password !== undefined} ) }>
                    <div className="input_wrap">
                        <i className="fa fa-lock" aria-hidden="true"/>
                        <input 
                            ref={(element)=> {this.passwordInput=element}}
                            type="password" 
                            placeholder="Password" 
                            required
                            />
                    </div>

                    <span className="error_massage">
                        { error.password || "" }
                    </span>

                </div>

                
                <div className={ classnames("massage_wrap", {"error":error.login !== undefined} ) }>
                    <span className="error_massage">
                        { error.login || "" }
                    </span>
                </div>

                <input type="submit" className="button" defaultValue="Log in"/>
            </form>

            <div className="footer">
                <span className="message">
                    Don’t have an account? 
                </span>

                <span className="txt_btn" onClick={()=> showSignUp()}>
                    Sign up
                </span>
            </div>
            
        </div>
        )
    }
}
