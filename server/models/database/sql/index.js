const Database = require('./Database');

const OPERATOR_AND=" AND ";
const OPERATOR_OR=" OR ";

const SQL={
    select:(tableName, cols=[]) => `SELECT ${(cols.length > 0)? cols.join() : "*"} FROM ${tableName}`,
    where:(where) => (where)? ` WHERE ${where}` : '',
    limit:(limit) => (limit)? ` LIMIT ${limit}` : '',
    join:(joinTable) => ` JOIN ${joinTable.tableName} ON ${joinTable.on}`,
    insert:(tableName, cols, values) => `INSERT INTO ${tableName} (${cols.join()}) VALUES(${values.join()})`,
    delete:(tableName, cols, values) => `DELETE FROM ${tableName}`
}


module.exports = class DatabaseSQL extends Database{

    constructor(username, password, databaseName){
        super(username, password, databaseName)    
    }

    insert(tableName, cols, values, callback){

        let sql=SQL.insert(tableName, cols, values)
        
        super.insert(sql, callback);
    }

    delete(tableName, where, callback){

        let sql=SQL.delete(tableName) + SQL.where(where)
        
        super.delete(sql, callback);
    }

    select(fromTable, select, joinTables=[], callback){
        if(typeof select === 'function'){
            callback=select;
            select={};
        }

        if(typeof joinTables === 'function'){
            callback=joinTables;
            joinTables=[];
        }
        
        let sql=SQL.select(fromTable, select.cols)

        for(let joinTable of joinTables){
            sql+=SQL.join(joinTable)
        }
        
        sql+=SQL.where(select.where) + SQL.limit(select.limit) 

        super.select(sql, callback);
    }

    isExistCallback(callback){

        return function(hasError, result){
            let isExist= (!hasError && result.length > 0)

            callback(isExist)
        }
    }
}