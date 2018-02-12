const express = require('express');
const DB = require('../../models/database/helper');

const router = express.Router();

const book = require('./book');
const wishlist = require('./wishlist');
const locations = require('./locations');



router.use("/locations", locations);

router.get("/reviews", function(req, res) {
    let locationId=req.query.locationId

    DB.getReviewsByLocationId(locationId , function(hasError, reviews){
        res.send(reviews);
        })
    });

router.get("/cities", function(req, res) {

    DB.getCities( function(hasError, cities){
        res.send(cities);
        })
    });

function loggedUsers(req, res, next) {
    let sess=req.session;

    if(!sess.user)
        {
        res.sendStatus(404);  
        return;    
        }

    next(); 
    }


router.use("/book", loggedUsers, book);
router.use("/wishlist", loggedUsers, wishlist);

router.get("/reservations", loggedUsers, function(req, res) {
    let userId=req.session.user.id;

    DB.getReservationsByUserId(userId, function(hasError, reservations){
        res.send(reservations);
        })
    });







module.exports = router;