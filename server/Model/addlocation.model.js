import mongoose  from "mongoose";

// Define a schema for your location data
const locationSchema = new mongoose.Schema({
  name_location: {
    type: String,
    required: true,
  },
  space_location: {
    type: String,
    required: true,
  },
  owner_contact: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
  },
  amount: {
    type: String,
  },
  photo: {
    type:String,
  },
  description: {
    type: String,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

// Create a Location model based on the schema
export default mongoose.model.locations || mongoose.model('location',locationSchema);


