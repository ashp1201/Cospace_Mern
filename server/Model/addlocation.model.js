
import mongoose from 'mongoose';

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
    type: String, // Save the Cloudinary URL as a string
    required: true,
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

export default mongoose.model('location', locationSchema);
