const mysql = require('mysql');

module.exports = class Database{

    onConnected(){}

    constructor(username, password, databaseName){
        this.db=mysql.createConnection({
                    host: "localhost",
                    user: username,
                    password: password
                });

        this.isConnected=false;
        this.isConnectionFailed=false;
        this.requsts=[] 
        this.databaseName=databaseName;       

        this.db.connect(this._onConnect.bind(this));
    }

    _onConnect(err){

        if (err) 
            {
            this._onConnectionFailed(err)
            return;
            }
        
        this.isConnected=true;
        this.onConnected()

        this.db.query(`USE ${this.databaseName}`)

        this._onReady()
    }
    
    _onConnectionFailed(err){
        console.error(`Failed to connect to database: ${err.stack}`)
        this.isConnectionFailed=true;    

        while(this.requsts.length > 0)
            {
            requst=this.requsts.shift() 

            requst.callback(true)
            }
    }

    _onReady(){
        let requst
        
        while(this.requsts.length > 0)
            {
            requst=this.requsts.shift() 

            this._execSQL(requst.sql, requst.callback)    
            }
    }

    _execSQL(sql, callback){

        if(this.isConnectionFailed)
            {
            let err=new Error("Cannot Connect to Database");   
            callback(err)
            return;
            }

        if(!this.isConnected)
            {
            this.requsts.push({sql,callback})
            return;
            }

        this.db.query(sql, callback); 
    }

    insert(sql, callback){

        this._execSQL(sql, function(err, result){
            let hasError=false

            if(err)
                {
                hasError=true
                console.error(`Failed to insert into database:\nsql= '${sql}'\n${err.stack}`)
                }

            let insertId= (result)? result.insertId : undefined

            callback(hasError, insertId)    
            });
    }

    delete(sql, callback){

        this._execSQL(sql, function(err, result){
            let hasError=false

            if(err)
                {
                hasError=true
                console.error(`Failed to delete from database:\nsql= '${sql}'\n${err.stack}`)
                }
            
            callback(hasError, result)    
            });
    }

    select(sql, callback){
        
        this._execSQL(sql, function(err, result=[]){
            let hasError=false

            if(err)
                {
                hasError=true
                console.error(`Cannot select database:\nsql= '${sql}'\n${err.stack}`)
                }
            
            callback(hasError, result)    
            });
        }


}