import React, { Component } from 'react';
import GoogleMap from './GoogleMap';

export default class Map extends Component {

    render() {
        return (
        <div id="location" className="location_map">
            <span className="title">Location</span>
            <GoogleMap {...this.props}/>
        </div>
        )
    }

}