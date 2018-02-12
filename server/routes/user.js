const express = require('express');

const DB = require('../models/database/helper');

const router = express.Router();

const message={
    required: "This field is required.",
    passLength: "Please enter a value between 6 and 20 characters long.",
    emailExist: "The email is already in use",
    login: "The email or password is incorrect"
    };


router.get("/",function(req, res) {
    let user=req.session.user || null

    res.send(user);
    });

router.use(function(req, res, next) {
    let sess=req.session;

    if(sess.user)
        {
        res.sendStatus(404);  
        return;    
        }

    next(); 
    });

router.post("/signup",function(req, res) {
    let {firstName, lastName, email, password}=req.body

    let error=validteSignUpQuery(firstName, lastName, email, password);

    if(error !== null){  
        sendResult(res, error, false) 
        return   
        }

    DB.isEmailExist(email, function(isExist){
        if(isExist){      
            sendResult(res, {email:message.emailExist}, false) 
            return   
            }   
          
        DB.addUser(firstName, lastName, email, password, function(hasError, insertId){
            let sess=req.session
            sess.user=createSessionUser(insertId, firstName)

            sendResult(res, null, !hasError)
            })    
        })
    });

router.post("/login",function(req, res) {
    let {email, password}=req.body

    let error=validteLoginQuery(email, password);

    if(error !== null){  
        sendResult(res, error, false) 
        return   
        }

    DB.getUser(email, password, function(hasError, result){
        let error=null
        let isSucceed=true

        if(!hasError && result.length > 0){      
            let sess=req.session
            let user=result[0]
            sess.user=createSessionUser(user.id, user.first_name)
            }else{
                error= {login:message.login}
                isSucceed=false
                }  
          
        sendResult(res, error, isSucceed)    
        })
  
    });

module.exports = router;

function createSessionUser(id, name){
    return {id, name}
    }

function sendResult(res, error, isSucceed){
    res.send({error, isSucceed});
    }

function validteSignUpQuery(firstName, lastName, email, password){
    let error={}

    if(isEmpty(firstName))
        {
        error.firstName=message.required;     
        }

    if(isEmpty(lastName))
        {
        error.lastName=message.required;     
        }
    
    if(isEmpty(email))
        {
        error.email=message.required;    
        }
    
    if(isEmpty(password))
        {
        error.password=message.required; 
        }else if(password.length < 6 || password.length > 20)
            {
            error.password=message.passLength;   
            }
    
    return (Object.keys(error).length > 0) ? error : null
    }

function validteLoginQuery(email, password){
    let error={}
    
    if(isEmpty(email))
        {
        error.email=message.required;    
        }
    
    if(isEmpty(password))
        {
        error.password=message.required; 
        }
    
    return (Object.keys(error).length > 0) ? error : null
    }

function isEmpty(str){
    return str === undefined || str.length === 0;
    }
