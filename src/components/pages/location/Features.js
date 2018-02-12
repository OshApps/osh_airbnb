import React from 'react';

export default function Features({maxGuests, bedrooms, beds}) {

    return (
        <div className="features">
        <div className="feature">
            <i className="fa fa-users" aria-hidden="true"/>
            <span>{maxGuests} Guests</span>
        </div>

        <div className="feature">
            <i className="fa fa-home" aria-hidden="true"/>
            <span>{bedrooms} Bedroom</span>
        </div>

        <div className="feature">
            <i className="fa fa-bed" aria-hidden="true"/>
            <span>{beds} Beds</span>
        </div>
    </div>
    )
}
