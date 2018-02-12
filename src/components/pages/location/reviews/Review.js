import React, { Component } from 'react';
import Rating from '@/shared/Rating';

export default class Review extends Component {

    render() {
        let {review}= this.props
        
        let {rating, description, first_name, last_name } =review

        return (
        <div className="review">
            <div className="name">{`${first_name} ${last_name}`}</div>     
            <Rating rating={rating}/>
            <div className="description">
                <span>{description}</span>
            </div> 
        </div>
        )
    }

}