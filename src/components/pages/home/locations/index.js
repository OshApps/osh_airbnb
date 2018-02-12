import React, { Component } from 'react';
import Location from './Location';


export default class Locations extends Component {

    constructor(props){
        super(props)
    }

    render() {
        let {locations}= this.props

        if(locations === undefined)
            {
            return <div className="loading">Could Not Find Locations</div>    
            }
        
        return (

        <section className="booked_items">

            { locations.map( (location, i) => <Location key={location.id} location={location}/> )}

        </section>     

        )
    }

}