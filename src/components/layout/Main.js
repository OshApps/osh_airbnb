import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import About from '@/pages/about';
import Home from '@/pages/home';
import Reservations from '@/pages/reservations';
import WishList from '@/pages/wishList';
import LocationDetails from '@/pages/location';

export default class Main extends Component {

    constructor(props){
        super(props)

        this.state={}
  
        this.renderLocationDetails=this.renderLocationDetails.bind(this)      
    }

    renderLocationDetails({match}){
        let locationId = parseInt(match.params.locationId)
        
        return <LocationDetails locationId={locationId}/>
    }

    render() {
        let {isUserLogged}= this.props

        return (
        <main>
            <Route exact path={`/`} component={Home}/>
            <Route path={`/location/:locationId`} render={this.renderLocationDetails}/>
            <Route path={`/about`} component={About}/>
            <Route path={`/reservations`} component={Reservations}/>
            <Route path={`/wishList`} component={WishList}/>
        </main>
        )
    }

}