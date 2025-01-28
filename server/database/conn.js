import mongoose from "mongoose";

//import {MongoMemoryServer} from "mongodb-memory-server";
// import ENV from '../config.js'
import dotenv from 'dotenv';


async function connect(){
const mongod =await MongoMemoryServer.create();
//create new mongodb instance when we create server
//const getUri =mongod.getUri();
dotenv.config();
// const db=await mongoose.connect(getUri);
const db =  await mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });



console.log("Database Connected");
return db;
}

export default connect;