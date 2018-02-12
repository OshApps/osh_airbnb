
module.exports={
    DatabaseName:"airbnb",

    Tables:{
        cities:{
            "TABLE_NAME":"cities",
            "COL_ID":"id",
            "COL_CITY_NAME":"city_name",
            "COL_COUNTRY":"country"
            },
        
        users:{
            "TABLE_NAME":"users",
            "COL_ID":"id",
            "COL_FIRST_NAME":"first_name",
            "COL_LAST_NAME":"last_name",
            "COL_EMAIL":"email",
            "COL_PASS":"pass"
            },
        
        locations:{
            "TABLE_NAME":"locations",
            "COL_ID":"id",
            "COL_LOCATION_NAME":"location_name",
            "COL_MAX_GUESTS":"max_guests",
            "COL_PRICE":"price",
            "COL_BEDS":"beds",
            "COL_BEDROOMS":"bedrooms",
            "COL_DESCRIPTION":"description",
            "COL_IMG":"img",
            "COL_REVIEWS_COUNT":"reviews_count",
            "COL_TOTAL_RATING":"total_rating",
            "COL_CITY_ID":"city_id",
            "COL_LAT":"lat",
            "COL_LNG":"lng"
            },
        
        reviews:{
            "TABLE_NAME":"reviews",
            "COL_ID":"id",
            "COL_USER_ID":"user_id",
            "COL_LOCATION_ID":"location_id",
            "COL_RATING":"rating",
            "COL_DESCRIPTION":"description"
            },
        
        wishlist:{
            "TABLE_NAME":"wishlist",
            "COL_ID":"id",
            "COL_USER_ID":"user_id",
            "COL_LOCATION_ID":"location_id"
            },
        
        reservations:{
            "TABLE_NAME":"reservations",
            "COL_ID":"id",
            "COL_USER_ID":"user_id",
            "COL_LOCATION_ID":"location_id",
            "COL_GUESTS":"guests",
            "COL_CHECK_IN":"check_in",
            "COL_CHECK_OUT":"check_out",
            "COL_PRICE":"price"
            }
    }
}