import React, { Component } from 'react';

import Booking from '&/pages/location/booking';

import Header from './Header';
import Nav from './Nav';
import Title from './title';
import Features from './Features';
import Description from './Description';
import Reviews from './reviews';
import Map from './map';

import fetchHelper from '~/utils/fetchHelper';
import {API_LOCATIONS_URL} from '~/consts/urls';


export default class Location extends Component {

    constructor(props){
        super(props)

        this.state={
            location:null, 
            isLoadingData:false
        }

    }

    componentWillMount(){
        
        this.loadData()
    }
    
    loadData(){
        let {locationId}=this.props

        this.setState({isLoadingData:true})

        fetchHelper.get(API_LOCATIONS_URL + locationId)
            .then( (location)=>{
                this.setState({location, isLoadingData:false})
                })
            .catch( error => {
                console.error(`Failed to fetch locations : ${error.stack}`);
                this.setState({isLoadingData:false})
                });
    }

    render() {
        let {location, isLoadingData}=this.state
        
        if(isLoadingData)
            {
            return <div className="loading">Loading...</div>    
            }
        
        if(location === null)
            {
            return <div className="loading">Location Not Found</div>    
            }

        let {
            id,
            img, 
            location_name, 
            max_guests, 
            bedrooms, 
            beds, 
            price, 
            description, 
            reviews_count, 
            total_rating, 
            lat,
            lng,
            city_id,
            city_name,
            country,
            isSaved
            } = location
        
        let rating = (reviews_count > 0)? total_rating/reviews_count : 0;
        
        return (
        <div className="location" >

            <Header imageUrl={img}/>
            
            <div className="contant">
                <div className="details" >
                    
                    <Nav/>

                    <div id="summary" className="summary" >
                        <Title  
                            name={location_name} 
                            reviewsCount={reviews_count} 
                            rating={rating} 
                            country={country} 
                            city={city_name}
                            />

                        <Features   
                            maxGuests={max_guests}  
                            bedrooms={bedrooms}  
                            beds={beds} 
                            />

                        <Booking    
                            locationId={id}
                            maxGuests={max_guests} 
                            price={price}
                            isLocationSaved={isSaved}
                            />

                        <Description description={description}/>
                        
                        <Reviews locationId={id}/>
                    </div>
                </div>

                <Map lat={lat} lng={lng}/>
            </div>
        
        </div>
                
        )
    }
}