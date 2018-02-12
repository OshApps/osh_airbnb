const MySql = require('sync-mysql');
const Moment = require('moment');

const cities = require('../../../data/cities.json');
const users = require('../../../data/users.json');
const locations = require('../../../data/locations.json');
const wishlist = require('../../../data/wishlist.json');
const reservations = require('../../../data/reservations.json');

const {DatabaseName, Tables} = require('../../../consts/database')
const UserDB = require('../../../config/userDB')

var db;

module.exports=function(){

    db = new MySql({
        host: "localhost",
        user: UserDB.username,
        password: UserDB.password
    });

    if(isDBExist(DatabaseName)){
        db.dispose();
        return;
    }

    console.log("Create database...");
    
    createDB()
    insertData()

    console.log("Database is ready to use");

    db.dispose();
}

function isDBExist(dbName){
   var result= db.query(`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${dbName}'`);

   return result.length > 0;
}

function createDB(){

    db.query(`CREATE DATABASE IF NOT EXISTS ${DatabaseName}
        CHARACTER SET utf8
        DEFAULT CHARACTER SET utf8
        COLLATE utf8_general_ci
        DEFAULT COLLATE utf8_general_ci
        `);

    console.log("Create database tables:");

    createTables()

    console.log("Database tables created\n\n");
}

function createTables(){
    db.query(`USE ${DatabaseName}`)

    // cities 
    console.log("Creating cities table...");

    db.query(`CREATE TABLE IF NOT EXISTS ${Tables.cities.TABLE_NAME} (
                ${Tables.cities.COL_ID} INT AUTO_INCREMENT PRIMARY KEY,
                ${Tables.cities.COL_CITY_NAME} VARCHAR(50) NOT NULL,
                ${Tables.cities.COL_COUNTRY} VARCHAR(50) NOT NULL
                )`);

    console.log("Cities table created\n");    

    //users
    console.log("Creating users table...");

    db.query(`CREATE TABLE IF NOT EXISTS ${Tables.users.TABLE_NAME} (
                ${Tables.users.COL_ID} INT AUTO_INCREMENT PRIMARY KEY,
                ${Tables.users.COL_FIRST_NAME} VARCHAR(50) NOT NULL,
                ${Tables.users.COL_LAST_NAME} VARCHAR(50) NOT NULL,
                ${Tables.users.COL_EMAIL} VARCHAR(50) NOT NULL,
                ${Tables.users.COL_PASS} VARCHAR(20) NOT NULL
                )`);

    console.log("Users table created\n");   

    //locations
    console.log("Creating locations table...");

    db.query(`CREATE TABLE IF NOT EXISTS ${Tables.locations.TABLE_NAME} (
                ${Tables.locations.COL_ID} INT AUTO_INCREMENT PRIMARY KEY,
                ${Tables.locations.COL_LOCATION_NAME} VARCHAR(100) NOT NULL,
                ${Tables.locations.COL_MAX_GUESTS} TINYINT NOT NULL,
                ${Tables.locations.COL_PRICE} INT NOT NULL,
                ${Tables.locations.COL_BEDS} TINYINT NOT NULL,
                ${Tables.locations.COL_BEDROOMS} TINYINT NOT NULL,
                ${Tables.locations.COL_DESCRIPTION} VARCHAR(1500) NOT NULL,
                ${Tables.locations.COL_IMG} VARCHAR(100) NOT NULL,
                ${Tables.locations.COL_REVIEWS_COUNT} INT DEFAULT 0,
                ${Tables.locations.COL_TOTAL_RATING} INT DEFAULT 0,
                ${Tables.locations.COL_CITY_ID} INT NOT NULL,
                ${Tables.locations.COL_LAT} FLOAT NOT NULL,
                ${Tables.locations.COL_LNG} FLOAT NOT NULL,
                FOREIGN KEY (${Tables.locations.COL_CITY_ID}) 
                REFERENCES ${Tables.cities.TABLE_NAME}(${Tables.cities.COL_ID}) 
                ON DELETE CASCADE
                )`);

    console.log("Locations table created\n"); 

    //reviews
    console.log("Creating reviews table...");

    db.query(`CREATE TABLE IF NOT EXISTS ${Tables.reviews.TABLE_NAME} (
                ${Tables.reviews.COL_ID} INT AUTO_INCREMENT PRIMARY KEY,
                ${Tables.reviews.COL_USER_ID} INT NOT NULL,
                ${Tables.reviews.COL_LOCATION_ID} INT NOT NULL,
                ${Tables.reviews.COL_RATING} FLOAT NOT NULL,
                ${Tables.reviews.COL_DESCRIPTION} VARCHAR(8000) NOT NULL,
                FOREIGN KEY (${Tables.reviews.COL_USER_ID}) 
                REFERENCES ${Tables.users.TABLE_NAME}(${Tables.users.COL_ID}) 
                ON DELETE CASCADE,

                FOREIGN KEY (${Tables.reviews.COL_LOCATION_ID}) 
                REFERENCES ${Tables.locations.TABLE_NAME}(${Tables.locations.COL_ID}) 
                ON DELETE CASCADE
                )`);
    console.log("Reviews table created\n");   

    //wishlist
    console.log("Creating wishlist table...");

    db.query(`CREATE TABLE IF NOT EXISTS ${Tables.wishlist.TABLE_NAME} (
                ${Tables.wishlist.COL_ID} INT AUTO_INCREMENT PRIMARY KEY,
                ${Tables.wishlist.COL_USER_ID} INT NOT NULL,
                ${Tables.wishlist.COL_LOCATION_ID} INT NOT NULL,
                FOREIGN KEY (${Tables.wishlist.COL_USER_ID}) 
                REFERENCES ${Tables.users.TABLE_NAME}(${Tables.users.COL_ID}) 
                ON DELETE CASCADE,

                FOREIGN KEY (${Tables.wishlist.COL_LOCATION_ID}) 
                REFERENCES ${Tables.locations.TABLE_NAME}(${Tables.locations.COL_ID}) 
                ON DELETE CASCADE
                )`);

    console.log("Wishlist table created\n");    

    //reservations
    console.log("Creating reservations table...");

    db.query(`CREATE TABLE IF NOT EXISTS ${Tables.reservations.TABLE_NAME} (
                ${Tables.reservations.COL_ID} INT AUTO_INCREMENT PRIMARY KEY,
                ${Tables.reservations.COL_USER_ID} INT NOT NULL,
                ${Tables.reservations.COL_LOCATION_ID} INT NOT NULL,
                ${Tables.reservations.COL_GUESTS} TINYINT NOT NULL,
                ${Tables.reservations.COL_CHECK_IN} DATE NOT NULL,
                ${Tables.reservations.COL_CHECK_OUT} DATE NOT NULL,
                ${Tables.reservations.COL_PRICE} INT NOT NULL,
                FOREIGN KEY (${Tables.reservations.COL_USER_ID}) 
                REFERENCES ${Tables.users.TABLE_NAME}(${Tables.users.COL_ID}) 
                ON DELETE CASCADE,

                FOREIGN KEY (${Tables.reservations.COL_LOCATION_ID}) 
                REFERENCES ${Tables.locations.TABLE_NAME}(${Tables.locations.COL_ID}) 
                ON DELETE CASCADE
                )`);

    console.log("Reservations table created\n");  
}

function insertData(){
    console.log("Inserting data...");

    insertCities()
    insertUsers()
    insertLocations()
    insertWishlist()
    insertReservations()

    console.log('Data inserted\n\n');
}

function insertCities(){
    console.log('Inserting cities...');

    for(city of cities)
        {

        db.query(`INSERT INTO ${Tables.cities.TABLE_NAME} (
                ${Tables.cities.COL_ID},
                ${Tables.cities.COL_CITY_NAME},
                ${Tables.cities.COL_COUNTRY}
                ) VALUES(
                ${city.id},
                "${city.name}", 
                "${city.country}"
                )`);    
        }

    console.log('Cities inserted\n\n');
}

function insertUsers(){
    let result
    
    console.log('Inserting users...');

    for(user of users)
        {

        result = db.query(`INSERT INTO ${Tables.users.TABLE_NAME} (
                        ${Tables.users.COL_FIRST_NAME},
                        ${Tables.users.COL_LAST_NAME},
                        ${Tables.users.COL_EMAIL},
                        ${Tables.users.COL_PASS}
                        ) VALUES(
                        "${user.firstName}", 
                        "${user.lastName}", 
                        "${user.email}", 
                        "${user.pass}" 
                        )`);  

        user.id= result.insertId                
        }
    
    console.log('Users inserted\n\n');
}

function insertLocations(){
    console.log('Insert locations and reviews:');

    for(location of locations)
        {
        console.log('Insert location...');   

        db.query(`INSERT INTO ${Tables.locations.TABLE_NAME} (
            ${Tables.locations.COL_ID},
            ${Tables.locations.COL_LOCATION_NAME},
            ${Tables.locations.COL_MAX_GUESTS},
            ${Tables.locations.COL_PRICE},
            ${Tables.locations.COL_BEDS},
            ${Tables.locations.COL_BEDROOMS},
            ${Tables.locations.COL_DESCRIPTION},
            ${Tables.locations.COL_IMG},
            ${Tables.locations.COL_REVIEWS_COUNT},
            ${Tables.locations.COL_TOTAL_RATING},
            ${Tables.locations.COL_CITY_ID},
            ${Tables.locations.COL_LAT},
            ${Tables.locations.COL_LNG}
            ) VALUES(
            ${location.id}, 
            "${location.name}", 
            ${location.maxGuests}, 
            ${location.price}, 
            ${location.beds}, 
            ${location.bedrooms}, 
            "${location.description}", 
            "${location.imageUrl}", 
            ${location.reviews.length}, 
            ${getRating(location.reviews)}, 
            ${location.cityId}, 
            ${location.geo.lat}, 
            ${location.geo.lng}
            )`);
        console.log('Location inserted\n');  
           
        insertReviews(location.id, location.reviews)                          
    }
    
    console.log('Locations and reviews inserted\n\n');
}

function getRating(reviews){
    let rating=0;
    
    for (let review of reviews) 
        {
        rating+= review.rating  
        }

    return rating;    
}


function insertReviews(locationId, reviews){
    let user

    console.log(`Insert ${location.reviews.length} reviews...`); 

    for(review of reviews)
        {
        user= users[ parseInt(Math.random() * users.length) ]

        db.query(`INSERT INTO ${Tables.reviews.TABLE_NAME} (
            ${Tables.reviews.COL_USER_ID},
            ${Tables.reviews.COL_LOCATION_ID},
            ${Tables.reviews.COL_RATING},
            ${Tables.reviews.COL_DESCRIPTION}
            ) VALUES(
            ${user.id}, 
            ${locationId}, 
            ${review.rating}, 
            "${review.description}"
            )`);                 
        }

    console.log('Reviews inserted\n'); 
}

function insertWishlist(){
    let user

    console.log('Inserting wishlist...');

    for(wish of wishlist)
        {
        user= users[ parseInt(Math.random() * users.length) ]

        db.query(`INSERT INTO ${Tables.wishlist.TABLE_NAME} (
            ${Tables.wishlist.COL_USER_ID},
            ${Tables.wishlist.COL_LOCATION_ID}
            ) VALUES(
            ${user.id}, 
            ${wish.locationId}
            )`);                   
        }

    console.log('Wishlist inserted\n\n');
}

function insertReservations(){
    let user

    console.log('Inserting reservations...');

    for(reservation of reservations)
        {
        user= users[ parseInt(Math.random() * users.length) ]

        db.query(`INSERT INTO ${Tables.reservations.TABLE_NAME} (
            ${Tables.reservations.COL_USER_ID},
            ${Tables.reservations.COL_LOCATION_ID},
            ${Tables.reservations.COL_GUESTS},
            ${Tables.reservations.COL_CHECK_IN},
            ${Tables.reservations.COL_CHECK_OUT},
            ${Tables.reservations.COL_PRICE}
            ) VALUES(
            ${user.id}, 
            ${reservation.locationId},
            ${reservation.guests},
            "${Moment(reservation.checkIn, "MM-DD-YYYY").format("YYYY-MM-DD")}",
            "${Moment(reservation.checkOut, "MM-DD-YYYY").format("YYYY-MM-DD")}",
            ${reservation.price}
            )`);                   
        }

    console.log('Reservations inserted\n\n');
}
