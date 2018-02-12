import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as modalActions from '~/actions/modal'

import Price from '@/pages/location/booking/Price';
import Form from '@/pages/location/booking/Form';
import WishList from '@/pages/location/booking/WishList';

class Booking extends Component {

    render() {
        let {
            price, 
            maxGuests, 
            isLocationSaved, 
            locationId,
            isUserLogged,
            showLogin
            }= this.props

        return (
        <div className="booking">
             <Price price={price}/>

             <Form 
                showLogin={showLogin}
                isUserLogged={isUserLogged}
                maxGuests={maxGuests}
                locationId={locationId}
                />

             <WishList 
                showLogin={showLogin}
                isUserLogged={isUserLogged}
                locationId={locationId}
                isLocationSaved={isLocationSaved} 
                />
        </div>
        )
    }

}

function mapStateToProps(state) {
    let {user}=state

	return {isUserLogged:(user!==null)}
}

function mapDispatchToProps(dispatch) {
	return {
        showLogin:()=> dispatch(modalActions.showLoginModal())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking) 