import mongoose from 'mongoose';

export const UserSchema =new mongoose.Schema({
    fullName :{
        type:String,
        require :[true,"Please provide your Fullname"],
        unique:false,
    },password:{
        type:String,
        require:[true,"Please provide a password"],
        unique:false,
    },email:{
        type:String,
        require:[true,"Please provide unique email"],
        unique:true,
    },gender:{
        type:String,
        require:[true,"Please provide a gender"],
        unique:false,
    },roles:[{ type : String }],
    permissions:[{ type : String }],
    user_type:{
        type:"String",
        default:'free',
    },
    location:{
        type:"String",
        default:'',
    },
    card:{
        type:Number,
        default:0,
    }
})
//Users mongoose.model.Users it should be purals
export default mongoose.model.Users || mongoose.model('User',UserSchema);
