const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');
const mongoDB = require('./config/keys').mongoURI;

const app = express();

// route vars
const createUser = require('./routes/user/createUser');
const login = require('./routes/user/logIn');
const addRecord = require('./routes/adminOnly/Inventory/addRecord');
const browseAll = require('./routes/shop/browseAll');
const search = require('./routes/shop/search');


mongoose
    .connect(mongoDB,{useNewUrlParser:true})
    .then(()=> console.log('MongoDb Connected'))
    .catch(err=> console.log(err));
   
    
app.use(bodyParser.urlencoded({extended: false}));
app.use(pino);

//routes
app.use('/createUser',createUser);
app.use('/login',login);
app.use('/browseAll',browseAll);
app.use('/search',search);

//admin only routes
app.use('/addRecord',addRecord);


app.get('*',(req,res, next)=>{
    console.log("route url: "+req.url);
    next();
})

app.get('/',(req,res) =>{
    res.send("SERVER IS RUNNING");
})


const port = process.env.PORT || 3001 ;
app.listen(port, () => console.log(`Server running on port ${port}`)
);