import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Details from './Details';


export default class Location extends Component {

    constructor(props){
        super(props)

        this.onRemove=this.onRemove.bind(this)
    }

    onRemove(){
        let {wish, removeLocationFromWishList}=this.props
        
        removeLocationFromWishList(wish.location_id)
    }

    render() {
        let {wish}= this.props
        
        let {
            id,
            location_id, 
            location_name, 
            city_id, 
            price, 
            img, 
            max_guests, 
            beds, 
            bedrooms, 
            description, 
            reviews_count, 
            total_rating,
            city_name,
            country
            } = wish
        
        let address=`${city_name} , ${country}`
        
        let rating = (reviews_count > 0)? total_rating/reviews_count : 0;

        return (
        <div className="item_list">
            <div className="location_img" style={{backgroundImage:`url(${img})`}}></div>
            <div className="location_details">
        
                <Details 
                    locationName={location_name}
                    description={description} 
                    address={address} 
                    maxGuests={max_guests} 
                    beds={beds} 
                    bedrooms={beds} 
                    rating={rating}
                    />

                <div className="right_item">

                    <div className="price_wrap">
                        <span className="price">${price}</span>
                        <span className="per_night">per night</span>
                    </div>

                    <div className="buttons">

                        <Link to={`/location/${location_id}`} replace>
                            <button className="details_btn button">Details</button>
                        </Link>

                        <a>
                            <button className="remove_btn button" onClick={this.onRemove}>Remove</button>
                        </a>
                    
                    </div>
                
                </div>
            </div>
        </div>
        )
    }
}