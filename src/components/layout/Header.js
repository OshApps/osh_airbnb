import React, { Component} from 'react'
import { Link } from 'react-router-dom'

export default function Header({user, showLogin, showSignUp}){
        let isUserLogged= (user!==null)

        return (
            <header> 
                <Link to="/" ><img src="/icons/logo.png" alt="logo"/></Link>
                <label htmlFor="dropdown_menu" className="dropdown"><i className="fa fa-angle-down" aria-hidden="true"></i></label>
                <input type="checkbox" name="small_menu" id="dropdown_menu"/>
                <nav>
                    <Link to="/" replace>Home</Link>
                    {!isUserLogged && <a onClick={()=>{showSignUp()}}>Sign Up</a>}
                    {!isUserLogged && <a onClick={()=>{showLogin()}}>Log In</a>}
                    {isUserLogged && <Link to="/reservations" replace>Reservations</Link>}
                    {isUserLogged && <Link to="/wishList" replace>WishList</Link>}
                    <Link to="/about" replace>About</Link>
                </nav>
            </header>
            )
    }


