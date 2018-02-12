import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Details extends Component {

    render() {
        let {name, address, checkIn, checkOut, guests} = this.props

        return (

        <div className="details">
            <span className="location_name">{name}</span>

            <span className="address">{address}</span>

            <span className="range_date">{checkIn + " - " + checkOut}</span>

            <span className="guests">Guests: {guests} </span>

        </div>   
        )
    }
}