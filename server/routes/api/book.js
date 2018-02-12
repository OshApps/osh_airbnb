const express = require('express');
const moment = require('moment');

const DB = require('../../models/database/helper');

const router = express.Router();

const message={
    required: "This field is required.",
    invalidDate: "Please enter valid dates.",
    rangeValue: "Please enter a value between 1 and {0}.",
    serverError: "Server failed to add your booking. Please try again"
    }

router.post("/", function(req, res) {
    let {locationId}=req.body;

    DB.getLocationInfoById(locationId, function(hasError, locationInfo){

        if(hasError){
            let error={other: message.serverError} 
            res.send({error})
            return
        }

        addReservation(req, res, locationInfo)
    })
    
});


module.exports = router;


function addReservation(req, res, locationInfo){
    let {locationId, guests, checkIn, checkOut}=req.body

    checkIn=getDate(checkIn)
    checkOut=getDate(checkOut)

    let error=validateBooking(locationInfo.max_guests, guests, checkIn, checkOut)

    if(error){
        res.send({error})
        return
    }
    
    let userId=req.session.user.id;

    let reservation=createReservation(userId, locationInfo, guests, checkIn, checkOut) 

    DB.addReservation(reservation, (hasError)=>{
        let error=(hasError)? {other: message.serverError} : null

        res.send({error});
    })
}

function getDate(date){
    date=moment(date, "MM-DD-YYYY")

    if(!date.isValid()){
        return null
    }

    return date
}

function createReservation(userId, locationInfo, guests, checkIn, checkOut){
    let locationId = locationInfo.id

    let price =calcPrice(locationInfo.price, checkIn, checkOut)

    checkIn=checkIn.format("YYYY-MM-DD")
    checkOut=checkOut.format("YYYY-MM-DD")

    return {userId, locationId, guests, checkIn, checkOut, price}
}

function calcPrice(price, checkIn, checkOut){
    let nights= checkOut.diff(checkIn, 'days')

    return nights * price
}

function validateBooking(maxGuests, guests, checkIn, checkOut){
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