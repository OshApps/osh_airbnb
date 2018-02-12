import React, { Component } from 'react';


export default class Search extends Component {
    constructor(props){
        super(props)

        this.onChange=this.onChange.bind(this)  

        this.filterLocations=this.props.filterLocations  
    }

    onChange(){
        let where=this.where_input.value
        let guest=parseInt(this.guest_input.value)
        
        this.filterLocations(where,guest)
    }

    render() {
        let {cities} = this.props

        return (
        <section className="search">

            <div className="search_box">
                <div className="box_text">
                    <label className="box_title" htmlFor="where_input">
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <span>Where</span>
                    </label>
                    
                    <input type="text" ref={ (element)=>{ this.where_input=element} } onChange={this.onChange} list="cities" id="where_input" placeholder="Anywhere"/>
                    <datalist id="cities">
                        {cities.map( (city)=> <option value={city.city_name} key={city.id}> {city.country}</option>)}
                    </datalist>
                </div>

                <div className="box_text">
                    <label className="box_title" htmlFor="guest_input">
                        <i className="fa fa-user" aria-hidden="true"></i>
                        <span>Guests</span> 
                    </label>
                    
                    <input type="number" ref={ (element)=>{ this.guest_input=element} } onChange={this.onChange} id="guest_input" min="1" defaultValue="1"/>
                </div>

            </div>
        </section>

        )
    }

}