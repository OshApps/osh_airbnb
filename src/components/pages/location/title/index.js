import React, { Component } from 'react';
import Address from './Address';

export default class Title extends Component {

    render() {
        let {name, reviewsCount, rating, country, city}= this.props

        return (
        <div className="location_title">
            <span className="name">{name}</span>
            <Address reviewsCount={reviewsCount} rating={rating} address={city + ", " + country}/>
        </div>
        )
    }

}