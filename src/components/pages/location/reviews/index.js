import React, { Component } from 'react';
import Review from './Review';

import fetchHelper from '~/utils/fetchHelper';
import {API_REVIEWS_URL} from '~/consts/urls';


export default class Reviews extends Component {
    
    constructor(props){
        super(props)
        
        this.state={isLoading:false, reviews:[]}
    }

    componentWillMount(){

        this.loadReviews()
    }

    loadReviews(){
        let {locationId}= this.props

        this.setState({isLoading:true})

        fetchHelper.get(API_REVIEWS_URL + locationId)
            .then((reviews) => {  
               this.setState( {isLoading:false, reviews:reviews} ) 
                })
            .catch( error => {
                console.error(`Failed to fetch reviews: ${error.stack}`);
                this.setState({isLoadingData:false})
                });
    }

    renderReviews(){
        let {isLoading, reviews}= this.state

        if(isLoading)
            {
            return <div className="loading">Loading...</div>        
            }

        return reviews.map((review)=> <Review key={review.id} review={review}/>)
    }

    render() {
        
        return (
         <div id="reviews" className="reviews">
            <span className="title">Reviews</span>
            { this.renderReviews() }
        </div>
        )
    }

}