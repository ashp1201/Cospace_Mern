import mongoose from 'mongoose';

export const AdminSchema =new mongoose.Schema({
email:{
    type:String,
    require:[true,"Please provide unique email"],
    unique:true,
},
    password:{
        type:String,
        require:[true,"Please provide a password"],
        unique:false,
}
})
//Admins mongoose.model.Admins it should be purals
export default mongoose.model.Admins || mongoose.model('Admin',AdminSchema);
//mongoose.model.Admins: This appears to be an attempt to check if an Admins model already exists in Mongoose. If it exists, it will use that model; otherwise, it will create a new model using the AdminSchema.

// mongoose.model('Admin', AdminSchema): This is the standard way to create a Mongoose model named 'Admin' based on the provided schema. If Admins model does not exist, this part of the code will create a new 'Admin' model.