import React, { Component } from 'react';
import classnames from 'classnames';

const MAX_RATING=5

export default class Rating extends Component {

    createStars(rating){
        let stars=[];

       

        for(var i=0; i < MAX_RATING; i++)
            {
            stars.push( 
                <i aria-hidden="true" key={i} className= {classnames( "fa", {
                    "fa-star": rating >= 1 , 
                    "fa-star-half-o":rating < 1 && rating >= 0.5  , 
                    "fa-star-o":rating < 0.5 
                    } )} />
                )

            rating--;
            }    
        
        return stars;
    }

    render() {
        let {rating}= this.props

        return (
        <div className="item_rate">
            { this.createStars(rating) }
        </div>    
        )
    }

}