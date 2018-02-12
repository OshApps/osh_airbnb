import React from 'react';

export default function Price({price}) {

    return (
    <div className="booking_price">
        <span className="price">${price}</span>
        <span>per night</span>
    </div>
    )
}