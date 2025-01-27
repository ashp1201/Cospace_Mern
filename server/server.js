import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect  from './database/conn.js';
import router from './Router/route.js'
import routerr from './Router/getUsers.js';
// import adminrouter from './Router/adminrouter.js'
import rolerouter from './Router/rolerouter.js';
import adminrouter from './Router/adminrouter.js';
import locationRouter from './Router/locationrouter.js';
import dotenv from 'dotenv';
const app=express();

import  bodyParser from 'body-parser';


// Express 4.0
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Express 3.0
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));





//middleware*/
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


app.use(allowCrossDomain);



    //some other code
  

app.use(express.json())
app.use(cors());

app.use(morgan('tiny'));
//.morgan : It helps you track and log various details about incoming HTTP requests, such as the HTTP method, status code, response time, and more.

// 'tiny'
//  Format: 'tiny' is one of the predefined logging formats provided by morgan. It's a concise format that logs minimal information about each request, typically including the HTTP method, URL, status code, response time, and the size of the response in bytes.
app.disable('x-powered-by');


const port =8000;


/* Htttp get Request */
app.get('/',(req,res)=>{
    res.status(201).json("Home Get Request");
})


//api routes 
app.use('/api',router); ///to access router use api as a prefix

app.use('/api',routerr);
//api routes for roles and permission
app.use('/api',rolerouter);

app.use('/api',adminrouter)

app.use('/api',locationRouter);

app.use('/uploads/files/', express.static(process.cwd() + '/uploads/files/'));
/** start Server only when we have valid connection  */
connect().then(() =>{
    try{
        app.listen(port,()=>{
            console.log(`Server connected to ${process.env.PORT}`)
            })
            

    }
    catch(error){
        console.log("Cannot connect to the server")
    }
}).catch(error=>{
console.log("Invalid database Connection")
})

