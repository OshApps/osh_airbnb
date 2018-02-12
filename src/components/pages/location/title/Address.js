import React, { Component } from 'react';
import Rating from '@/shared/Rating';

export default function Address({reviewsCount, rating, address}) {

    return (
    <div className="address">
        <span className="position">{address}</span>
        <div className="rating_wrap">
            <Rating rating={rating}/>
            <span>{reviewsCount} reviews</span>
        </div>
    </div>
    )
}
