import React, { Component } from 'react';
import { withRouter } from 'react-router';

import DatePicker from 'react-datepicker'
import classnames from "classnames"
import moment from 'moment'

import fetchHelper from '~/utils/fetchHelper';
import {API_BOOK_URL} from '~/consts/urls';

import 'react-datepicker/dist/react-datepicker.css';

const message={
    required: "This field is required.",
    invalidDate: "Please enter valid dates.",
    rangeValue: "Please enter a value between 1 and {0}.",
    }

class Form extends Component {
    
    constructor (props) {
        super(props)

        this.state = { 
            checkIn: null, 
            checkOut: null, 
            checkOutMinDate: null,
            error:null
        };

        this.onChange=this.props.onChange;

        this.bindMethods()
    }

    bindMethods(){
        this.onBooking = this.onBooking.bind(this);
        this.onCheckInChange = this.onCheckInChange.bind(this);
        this.onCheckOutChange = this.onCheckOutChange.bind(this);
    }

    onCheckInChange(date){

        this.setState({ 
            checkIn: date, 
            checkOut: null,
            checkOutMinDate: date.clone().add(1, 'days')
        })
    }

    onCheckOutChange(date){
        this.setState({ checkOut: date})
    }

    onBooking(){
        let {
            locationId,
            maxGuests,
            addLocationToReservations
            }= this.props

        let {checkIn, checkOut, errorMsg}= this.state

        let guests= parseInt(this.guestInput.value)

        let error=this.validateBooking(maxGuests, guests, checkIn, checkOut)

        if(error === null)
            {

            checkIn= checkIn.format("MM/DD/YYYY")
            checkOut= checkOut.format("MM/DD/YYYY")
            this.sendBookRequest(locationId, guests, checkIn, checkOut)
            }

        this.setState({error})   
    }

    sendBookRequest(locationId, guests, checkIn, checkOut){
        let {showLogin, isUserLogged}= this.props

        if(!isUserLogged){
            showLogin()
            return
        }

        fetchHelper.post(API_BOOK_URL, {locationId, guests, checkIn, checkOut})
            .then((result)=>{
                let error=result.error

                if(error){
                    this.setState({error}) 
                    return
                }
                
                this.props.history.push('/');
            })
    }

    validateBooking(maxGuests, guests, checkIn, checkOut){
        let hasDates=true
        let error={}

        if(guests < 1 || guests > maxGuests ) {
            error.guests=message.rangeValue.replace("{0}", maxGuests)   
        }

        if(checkIn === null ) {
            hasDates=false
            error.checkIn=message.required  
        }

        if(checkOut === null ) {
            hasDates=false
            error.checkOut=message.required    
        }

        if( hasDates && checkOut.diff(checkIn, 'days') < 1 ) {
            error.checkIn=message.invalidDate
            error.checkOut=message.invalidDate    
        }
            
        return (Object.keys(error).length > 0) ? error : null     
    }

    render() {
        let {maxGuests}= this.props
        let {checkIn, checkOut, checkOutMinDate, error}=this.state

        checkOutMinDate= checkOutMinDate || moment()

        error= error || {}

        return (
        <div className="booking_form">
            <div className="booking_check">
                <div className={ classnames("check ", {"error": error.checkIn !== undefined } ) } >
                    <span >Check In</span>

                    <DatePicker  
                            placeholderText="mm/dd/yyyy"
                            minDate={checkOutMinDate}
                            selected={checkIn}
                            onChange={this.onCheckInChange}
                            />     
                </div>

                <div className={ classnames("check ", {"error":error.checkOut !== undefined} ) }>
                    <span>Check Out</span>

                    <DatePicker  
                            placeholderText="mm/dd/yyyy"
                            minDate={checkOutMinDate}
                            selected={checkOut}
                            onChange={this.onCheckOutChange}
                            />

                </div>

                <span className="error_massage">
                    { error.checkIn || error.checkOut || "" }
                </span>
            </div>

            <div className={ classnames("guests ", {"error":error.guests !== undefined} ) }>
                <span>Guests</span>

                <input 
                    ref={(element)=> {this.guestInput=element}}
                    type="number" 
                    defaultValue="1" 
                    min="1" 
                    max={maxGuests} 
                    />

                <span className="error_massage">
                    { error.guests || "" }
                </span>
            </div>

            <button className="book_button" onClick={this.onBooking}>
                Request to Book
            </button>

            <div className={ classnames("other_error", { "error":error.other !== undefined} ) }>
                <span className="error_massage">
                    { error.other || "" }
                </span>
            </div>

            <span className="message">You won’t be charged yet</span>
        </div>
        )
    }

}

export default withRouter(Form);