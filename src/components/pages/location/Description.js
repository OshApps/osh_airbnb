import React from 'react';

export default function Description({description}) {

    return (
    <div className="location_description">
        <span className="title">Description</span>
        <span>{description}</span>
    </div>
    )
}