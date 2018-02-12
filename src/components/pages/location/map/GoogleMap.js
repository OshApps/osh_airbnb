import React, { Component } from 'react';


export default class GoogleMap extends Component {
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(nextProps){
        let {lat, lng}=nextProps

        this.googleMap.setCenter({lat:lat, lng:lng})
    }

    shouldComponentUpdate(){
        return false
    }

    componentDidMount(){
        let {lat, lng}=this.props

        this.googleMap= new google.maps.Map(this.mapElement, {
            center:{lat:lat, lng:lng},
            zoom:14
        })

        this.marker = new google.maps.Marker({
          map: this.googleMap,
          position: {lat:lat, lng:lng},
        })

    }
    
    render() {   
       
        return (

            <div ref={(element)=>{ this.mapElement=element }} className="map"></div>
 
        )
    }

}