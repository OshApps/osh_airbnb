import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Rating from '@/shared/Rating';


export default class Details extends Component {

    render() {
        let {locationName, description, address, maxGuests, beds, bedrooms, rating} = this.props

        return (

        <div className="details">
            <span className="location_name">{locationName}</span>

            <span className="address">{address}</span>

            <div className="location_features">
                <span className="guests"><i className="fa fa-users" aria-hidden="true"/> {maxGuests}</span>
                <span className="bedrooms"><i className="fa fa-home" aria-hidden="true"/> {bedrooms}</span>
                <span className="beds"><i className="fa fa-bed" aria-hidden="true"/> {beds}</span>
                <Rating rating={rating}/>
            </div>

            <p className="description">{description}</p>

        </div>     
        )
    }
}