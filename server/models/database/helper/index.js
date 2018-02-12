const DatabaseSQL = require('../sql');
const DBCreator = require('../creator');

const {DatabaseName, Tables} = require('../../../consts/database')
const UserDB = require('../../../config/userDB')

class DatabaseHelper extends DatabaseSQL{
    
    constructor(){
        super(UserDB.username, UserDB.password, DatabaseName)           
    }

    onConnected(){
        DBCreator()
    }

//****** Locations ***** 

    getLocations(callback){
        let locationsTableName=Tables.locations.TABLE_NAME
        let citiesTableName=Tables.cities.TABLE_NAME

        let joinTables=[{
            tableName:citiesTableName,
            on:`${locationsTableName}.${Tables.locations.COL_CITY_ID}=${citiesTableName}.${Tables.cities.COL_ID}`
        }]

        let select={
            cols:[
                `${locationsTableName}.${Tables.locations.COL_ID}`, 
                `${locationsTableName}.${Tables.locations.COL_LOCATION_NAME}`, 
                `${locationsTableName}.${Tables.locations.COL_PRICE}`, 
                `${locationsTableName}.${Tables.locations.COL_IMG}`, 
                `${locationsTableName}.${Tables.locations.COL_MAX_GUESTS}`, 
                `${locationsTableName}.${Tables.locations.COL_REVIEWS_COUNT}`, 
                `${locationsTableName}.${Tables.locations.COL_TOTAL_RATING}`, 
                `${locationsTableName}.${Tables.locations.COL_CITY_ID}`, 
                `${citiesTableName}.${Tables.cities.COL_CITY_NAME}`
            ]
        }

        this.select(locationsTableName, select, joinTables, callback)
    }

    getLocationById(locationId, callback){
        let locationsTableName=Tables.locations.TABLE_NAME
        let citiesTableName=Tables.cities.TABLE_NAME

        let joinTables=[{
            tableName:citiesTableName,
            on:`${locationsTableName}.${Tables.locations.COL_CITY_ID}=${citiesTableName}.${Tables.cities.COL_ID}`
        }]

        let select={
            where:`${locationsTableName}.${Tables.locations.COL_ID}=${locationId}`,

            cols:[
                `${locationsTableName}.*`, 
                `${citiesTableName}.${Tables.cities.COL_CITY_NAME}`,
                `${citiesTableName}.${Tables.cities.COL_COUNTRY}`
            ],

            limit:1
        }

        this.select(locationsTableName, select, joinTables, function(hasError, result){

            if(!hasError){
                result=result[0]
            }

            callback(hasError, result)
        })
    }

    getLocationInfoById(locationId, callback){
        let locationsTableName=Tables.locations.TABLE_NAME

        let select={
            where:`${Tables.locations.COL_ID}=${locationId}`,

            cols:[
                `${Tables.locations.COL_ID}`, 
                `${Tables.locations.COL_MAX_GUESTS}`, 
                `${Tables.locations.COL_PRICE}` 
            ],

            limit:1
        }

        this.select(locationsTableName, select,  function(hasError, result){

            if(!hasError){
                result=result[0]
            }

            callback(hasError, result)
        })
    }

//****** Reviews ***** 

    getReviewsByLocationId(locationId, callback){
        let reviewsTableName=Tables.reviews.TABLE_NAME
        let usersTableName=Tables.users.TABLE_NAME

        let joinTables=[{
            tableName:usersTableName,
            on:`${reviewsTableName}.${Tables.reviews.COL_USER_ID}=${usersTableName}.${Tables.users.COL_ID}`
        }]

        let select={
            where:`${reviewsTableName}.${Tables.reviews.COL_LOCATION_ID}=${locationId}`,

            cols:[
                `${reviewsTableName}.*`, 
                `${usersTableName}.${Tables.users.COL_FIRST_NAME}`,
                `${usersTableName}.${Tables.users.COL_LAST_NAME}`
            ]
        }

        this.select(reviewsTableName, select, joinTables, callback)
    }

//****** Wishlist ***** 

    getWishlistByUserId(userId, callback){
        let wishlistTableName=Tables.wishlist.TABLE_NAME
        let locationsTableName=Tables.locations.TABLE_NAME
        let citiesTableName=Tables.cities.TABLE_NAME

        let joinTables=[
            {
            tableName:locationsTableName,
            on:`${wishlistTableName}.${Tables.wishlist.COL_LOCATION_ID}=${locationsTableName}.${Tables.locations.COL_ID}`
            },
            {
            tableName:citiesTableName,
            on:`${locationsTableName}.${Tables.locations.COL_CITY_ID}=${citiesTableName}.${Tables.cities.COL_ID}`
            }
        ]

        let select={
            where:`${wishlistTableName}.${Tables.wishlist.COL_USER_ID}=${userId}`,

            cols:[
                `${wishlistTableName}.*`, 
                `${locationsTableName}.${Tables.locations.COL_LOCATION_NAME}`,  
                `${locationsTableName}.${Tables.locations.COL_IMG}`, 
                `${locationsTableName}.${Tables.locations.COL_MAX_GUESTS}`, 
                `${locationsTableName}.${Tables.locations.COL_PRICE}`, 
                `${locationsTableName}.${Tables.locations.COL_DESCRIPTION}`, 
                `${locationsTableName}.${Tables.locations.COL_REVIEWS_COUNT}`, 
                `${locationsTableName}.${Tables.locations.COL_TOTAL_RATING}`, 
                `${locationsTableName}.${Tables.locations.COL_BEDS}`, 
                `${locationsTableName}.${Tables.locations.COL_BEDROOMS}`, 
                `${citiesTableName}.${Tables.cities.COL_CITY_NAME}`,
                `${citiesTableName}.${Tables.cities.COL_COUNTRY}`
            ]
        }

        this.select(wishlistTableName, select, joinTables, callback)
    }

    isLocationInWishlist(userId, locationId, callback){
        let wishlistTableName=Tables.wishlist.TABLE_NAME

        let select={
            where:`${Tables.wishlist.COL_USER_ID}=${userId} AND ${Tables.wishlist.COL_LOCATION_ID}=${locationId}`,
            limit:1
        }

        this.select(wishlistTableName, select, this.isExistCallback(callback))
    }

    addLocationToWishlist(userId, locationId, callback){
        let wishlistTableName=Tables.wishlist.TABLE_NAME
        
        let cols=[
            Tables.wishlist.COL_USER_ID,  
            Tables.wishlist.COL_LOCATION_ID
        ]

        let values=[
            userId,
            locationId
        ]

        this.insert(wishlistTableName, cols, values, callback)
    }

    removeLocatioFromWishlist(userId, locationId, callback){
        let wishlistTableName=Tables.wishlist.TABLE_NAME

        let where=`${Tables.wishlist.COL_USER_ID}=${userId} AND ${Tables.wishlist.COL_LOCATION_ID}=${locationId}`

        this.delete(wishlistTableName, where, callback)
    }
    
//****** Reservations ***** 

    getReservationsByUserId(userId, callback){
        let reservationsTableName=Tables.reservations.TABLE_NAME
        let locationsTableName=Tables.locations.TABLE_NAME
        let citiesTableName=Tables.cities.TABLE_NAME

        let joinTables=[
            {
            tableName:locationsTableName,
            on:`${reservationsTableName}.${Tables.reservations.COL_LOCATION_ID}=${locationsTableName}.${Tables.locations.COL_ID} `
            },
            {
            tableName:citiesTableName,
            on:`${locationsTableName}.${Tables.locations.COL_CITY_ID}=${citiesTableName}.${Tables.cities.COL_ID}`
            }
        ]

        let select={
            where:`${reservationsTableName}.${Tables.reservations.COL_USER_ID}=${userId}`,

            cols:[
                `${reservationsTableName}.*`, 
                `${locationsTableName}.${Tables.locations.COL_LOCATION_NAME}`,  
                `${locationsTableName}.${Tables.locations.COL_IMG}`, 
                `${citiesTableName}.${Tables.cities.COL_CITY_NAME}`,
                `${citiesTableName}.${Tables.cities.COL_COUNTRY}`
            ]
        }

        this.select(reservationsTableName, select, joinTables, callback)
    }

    addReservation(reservation, callback){
        let reservationsTableName=Tables.reservations.TABLE_NAME

        let cols=[
            Tables.reservations.COL_USER_ID,  
            Tables.reservations.COL_LOCATION_ID,  
            Tables.reservations.COL_GUESTS,  
            Tables.reservations.COL_CHECK_IN,  
            Tables.reservations.COL_CHECK_OUT,  
            Tables.reservations.COL_PRICE  
        ]

        let values=[
            reservation.userId,
            reservation.locationId,
            reservation.guests,
            `"${reservation.checkIn}"`,
            `"${reservation.checkOut}"`,
            reservation.price
        ]

        this.insert(reservationsTableName, cols, values, callback)
    }

//****** Users *****   

    addUser(firstName, lastName, email, pass, callback){
        let usersTableName=Tables.users.TABLE_NAME
        
        let cols=[
            Tables.users.COL_FIRST_NAME,  
            Tables.users.COL_LAST_NAME,  
            Tables.users.COL_EMAIL,  
            Tables.users.COL_PASS  
        ]

        let values=[
            `'${firstName}'`,
            `'${lastName}'`,
            `'${email}'`,
            `'${pass}'`
        ]

        this.insert(usersTableName, cols, values, callback)
    }

    getUser(email, pass, callback){
        let usersTableName=Tables.users.TABLE_NAME

        let select={
            where:`${Tables.users.COL_EMAIL}='${email}' AND ${Tables.users.COL_PASS}='${pass}'`,
            limit:1
        }

        this.select(usersTableName, select, callback)
    }

    isEmailExist(email, callback){
        let usersTableName=Tables.users.TABLE_NAME

        let select={
            where:`${Tables.users.COL_EMAIL}='${email}'`,
            limit:1
        }

        this.select(usersTableName, select, this.isExistCallback(callback) )
    }

//****** Cities ***** 

    getCities(callback){
  
        this.select(Tables.cities.TABLE_NAME, callback)
    }
}

module.exports = new DatabaseHelper()