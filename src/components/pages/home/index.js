import React, { Component } from 'react';
import { connect } from 'react-redux'

import {Route} from 'react-router-dom'

import Jumbotron from '@/pages/home/Jumbotron';
import Search from '@/pages/home/Search';
import Locations from '@/pages/home/locations';

import fetchHelper from '~/utils/fetchHelper';
import {API_CITIES_URL, API_LOCATIONS_URL} from '~/consts/urls';

export default class Home extends Component {

    constructor(props){
        super(props)

        this.state={
            locations:[], 
            cities:[], 
            filteredLocations:[],
            isLoadingData:false
        }

        this.filterLocations=this.filterLocations.bind(this)
    }

    componentWillMount(){
        
        this.loadData()
    }
    
    loadData(){
        this.setState({isLoadingData:true})

        fetchHelper.get(API_LOCATIONS_URL, API_CITIES_URL)
            .then( ([locations, cities])=>{
                this.setState({locations, cities, filteredLocations:locations, isLoadingData:false})
                })
            .catch( error => {
                console.error(`Failed to fetch locations and cities: ${error.stack}`);
                this.setState({isLoadingData:false})
                });
    }

    filterLocations(where, guest){
        let {locations}=this.state

        where=where.toLocaleLowerCase()

        let filteredLocations= locations.filter((location) =>{
            let cityName=location.city_name.toLocaleLowerCase()

            return cityName.startsWith(where) && location.max_guests >= guest
            })

        this.setState({filteredLocations})
    }

    renderLocations(){
        let {filteredLocations, isLoadingData}=this.state; 

        if(isLoadingData)
            {
            return <div className="loading">Loading...</div>    
            }
        
        return <Locations locations={filteredLocations}/>
    }

    render() {
        let {cities}=this.state;

        return (
        <div className="home contant">
            <Jumbotron/>
            <Search filterLocations={this.filterLocations} cities={cities} />
            {this.renderLocations()}
        </div>
        )
    }

}