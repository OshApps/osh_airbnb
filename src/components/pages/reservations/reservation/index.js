import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Details from './Details';


export default class Reservation extends Component {

    render() {
        let { reservation} = this.props

        let { 
            id, 
            location_id, 
            guests, 
            check_in, 
            check_out, 
            location_name, 
            price, 
            img, 
            city_name, 
            country
            } = reservation

        check_in=moment(check_in).format("MM/DD/YYYY")
        check_out=moment(check_out).format("MM/DD/YYYY")

        let address=`${city_name} , ${country}`

        return (
        <div className="item_list">
                <div className="location_img" style={{backgroundImage:`url(${img})`}}></div>
                
                <div className="location_details">
            
                    <Details 
                        name={location_name}
                        address={address}
                        checkIn={check_in} 
                        checkOut={check_out} 
                        guests={guests}
                        />
                    
                    <div className="right_item">

                        <div className="price_wrap">
                            <span className="price">${price}</span>
                        </div>

                        <div className="buttons">

                            <Link to={`/location/${location_id}`} replace>
                                <button className="details_btn button">Details</button>
                            </Link>
                        </div>
                    
                    </div>
                </div>
        </div>
        )
    }
}