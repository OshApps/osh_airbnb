const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./routes/api');
const user = require('./routes/user');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

let secret=Math.random().toString(36).substring(2);
let hour=1000 * 60 * 60;

app.use(session({ secret: secret, 
                  cookie: { maxAge: hour }, 
                  resave: false, 
                  saveUninitialized: true,}));

app.use("/api", api);
app.use("/user", user);

app.get("*", function(req, res) {

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server=app.listen(3000);