import React, { Component } from 'react';

import fetchHelper from '~/utils/fetchHelper';
import {API_WISHLIST_URL, API_WISHLIST_REMOVE_URL} from '~/consts/urls';

import Location from './location';


export default class WishList extends Component {

    constructor(props){
        super(props)

        this.state={
            wishList:[],
            isLoadingData:false
        }

        this.onRemoveLocation=this.onRemoveLocation.bind(this)
    }

    componentWillMount(){
        
        this.loadData()
    }
    
    loadData(){
        this.setState({isLoadingData:true})

        fetchHelper.get(API_WISHLIST_URL)
            .then( (wishList)=>{
                this.setState({wishList , isLoadingData:false})
                })
            .catch( error => {
                console.error(`Failed to fetch reservations: ${error.stack}`);
                this.setState({isLoadingData:false})
                });
    }

    onRemoveLocation(locationId){
        
        fetchHelper.get(API_WISHLIST_REMOVE_URL + locationId)
            .then((result)=>{
                
                if(result.isSucceeded){
                    let {wishList}= this.state
                    this.setState({wishList: wishList.filter( (wish) => wish.location_id !== locationId)})
                }

            })
    }

    renderWishList(){
        let { removeLocationFromWishList }=this.props
        let {wishList, isLoadingData}=this.state; 
        
        if(isLoadingData)
            {
            return <div className="loading">Loading...</div>    
            }
        
        return wishList.map( (wish)=> (
                <Location 
                    key={wish.id} 
                    wish={ wish } 
                    removeLocationFromWishList={this.onRemoveLocation} 
                    /> 
                ))
    }

    render() {
        
        return (
        <div className="contant">
            <span className="title">WishList</span>
            <div className="list">

                {this.renderWishList()}
            </div>

        </div>
        )
    }

}