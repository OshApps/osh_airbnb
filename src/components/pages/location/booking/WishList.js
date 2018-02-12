import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import classnames from "classnames"

import fetchHelper from '~/utils/fetchHelper';
import {API_WISHLIST_ADD_URL, API_WISHLIST_REMOVE_URL} from '~/consts/urls';


export default class WishList extends Component {
    
    constructor(props){
        super(props)
        let {isLocationSaved}= this.props

        this.state={isLocationSaved}

        this.handleClick=this.handleClick.bind(this)
    }

    handleClick(){
        let {isLocationSaved}= this.state
        let {locationId, showLogin, isUserLogged}= this.props

        if(!isUserLogged){
            showLogin()
            return
        }

        let url= (isLocationSaved)? API_WISHLIST_REMOVE_URL : API_WISHLIST_ADD_URL

        fetchHelper.get(url + locationId)
            .then((result)=>{

                if(result.isSucceeded){
                    this.setState({isLocationSaved:!isLocationSaved})
                }

            })
    }

    render(){
        let {isLocationSaved}= this.state

        let buttonText= (isLocationSaved)? "Remove from Wish list" : "Save to Wish List"

        return (
            <div className="wish_list">

            <button 
                className={ classnames("wish_list_button ", {"selected":isLocationSaved} ) } 
                onClick={this.handleClick}
                >

                <i 
                    className={ classnames("fa", {"fa-heart":isLocationSaved,  "fa-heart-o":!isLocationSaved }) } 
                    aria-hidden="true"
                    />
                
                <span>{buttonText}</span>
            </button>

            <span className="saved_count">86287 travelers saved this place</span>

            <div className="share_icons">
                <a href="#"><i className="fa fa-facebook" aria-hidden="true"/></a>
                <a href="#"><i className="fa fa-twitter" aria-hidden="true"/></a>
                <a href="#"><i className="fa fa-envelope" aria-hidden="true"/></a>
                <a href="#"><i className="fa fa-ellipsis-h" aria-hidden="true"/></a>
            </div>

        </div>
        )
    }
}