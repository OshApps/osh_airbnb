import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Rating from '@/shared/Rating';


export default class Location extends Component {

    render() {
        let {id, location_name, price, img, reviews_count, total_rating}= this.props.location

        let rating=(reviews_count > 0)? total_rating/reviews_count : 0;
        
        return (
            <Link to={`/location/${id}`} className="booked_item" replace>
                <div className="tooltip">
                    <div className="tooltip_wrapper">
                        <span className="tooltip_text">{location_name}</span>
                    </div>
                    <img src={img} alt="img"/>
                </div>
            
                <div className="item_details">
                    
                    <span className="item_price">${price}</span> 
                    <span className="item_name">{location_name}</span>
                </div>
                
                <div className="item_reviews">
                    <Rating rating={rating}/>
                    <span>{reviews_count} reviews</span>
                </div>  
             </Link>               
        )
    }

}