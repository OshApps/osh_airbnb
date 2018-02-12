const express = require('express');
const DB = require('../../models/database/helper');

const router = express.Router();

router.get("/", function(req, res) {

    DB.getLocations( function(hasError, locations){
        res.send(locations);
    })
});

router.get("/:location_id", function(req, res) {
    let locationId = req.params.location_id

    DB.getLocationById(locationId, function(hasError, location){
        let user=req.session.user;

        if(!user){
            location.isSaved=false
            
            res.send(location);
            return
        }
        
        DB.isLocationInWishlist(user.id, locationId, function(isLocationSaved){
            location.isSaved=isLocationSaved

            res.send(location);
        })

    })
});

module.exports = router;
