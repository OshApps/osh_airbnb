import React, { Component } from 'react';

import fetchHelper from '~/utils/fetchHelper';
import {API_RESERVATIONS_URL} from '~/consts/urls';

import Reservation from './reservation';


export default class Reservations extends Component {

    constructor(props){
        super(props)

        this.state={
            reservations:[],
            isLoadingData:false
        }
    }

    componentWillMount(){
        
        this.loadData()
    }
    
    loadData(){
        this.setState({isLoadingData:true})

        fetchHelper.get(API_RESERVATIONS_URL)
            .then( (reservations)=>{
                this.setState({reservations , isLoadingData:false})
                })
            .catch( error => {
                console.error(`Failed to fetch reservations: ${error.stack}`);
                this.setState({isLoadingData:false})
                });
    }

    renderReservations(){
        let {reservations, isLoadingData}=this.state; 

        if(isLoadingData)
            {
            return <div className="loading">Loading...</div>    
            }
        
        return reservations.map( (reservation)=> <Reservation key={reservation.id} reservation={reservation}/> )
    }

    render() {

        return (
        <div className="reservations contant">
            <span className="title">Reservations</span>
            <div className="list">
                {this.renderReservations()}
            </div>
        </div>
        )
    }
}