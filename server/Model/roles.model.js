import mongoose from 'mongoose';

export const RolesSchema = new mongoose.Schema({
    role:String,
    permissions:[{type:String}]
})

export default mongoose.model.Roles || mongoose.model('Role',RolesSchema);