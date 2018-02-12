const express = require('express');
const DB = require('../../models/database/helper');

const router = express.Router();

router.get("/", function(req, res) {
    let userId=req.session.user.id;

    DB.getWishlistByUserId(userId, function(hasError, wishlist){
        res.send(wishlist);
    })
});


router.get("/add", function(req, res) {
    let userId=req.session.user.id;
    let locationId=req.query.locationId

    DB.addLocationToWishlist(userId, locationId, function(hasError){

        res.send({isSucceeded: !hasError});
    })

});

router.get("/remove", function(req, res) {
    let userId=req.session.user.id;
    let locationId=req.query.locationId

    DB.removeLocatioFromWishlist(userId, locationId, function(hasError){

        res.send({isSucceeded: !hasError});
    })
});

module.exports = router;