import addlocationModel from "../Model/addlocation.model.js";
import cloudinary from '../cloudinary.js';

/**POST : http://localhost:8000/api/addlocation 
/* @param :{
    "name_location":"Mumbai",
    "space_location":"403",
    "owner_contact":"9393933323",
    "user_type":"free",
    "amount":"456",
    "photo":"'/uploads/files/generated-filename.jpg'",
    "description":"lodjsdksmks",
    "latitude":"15.43",
    "longitude":"12.23"
}
*/
export const addLocation = async (req, res) => {
  try {
    const {
      name_location,
      space_location,
      owner_contact,
      user_type,
      amount,
      description,
      latitude,
      longitude,
    } = req.body;

    // Use the Cloudinary URL from req.file
    const imgUrl = req.file.path;

    // Create a new Location document
    const newLocation = new addlocationModel({
      name_location,
      space_location,
      owner_contact,
      user_type,
      amount,
      photo: imgUrl, // Save Cloudinary URL
      description,
      latitude,
      longitude,
    });

    // Save to the database
    const savedLocation = await newLocation.save();

    res.status(201).json({
      message: 'Location added successfully',
      location: savedLocation,
    });
  } catch (error) {
    console.error('Error adding location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



  export const getLocationsByUserType = async (req, res) => {
  const { user_type } = req.query; // Get the user_type from the query parameters

  try {
    const locations = await addlocationModel.find({ user_type });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error',e:error.message });
  }
};


/** DELETE: Remove location and its image */
export const deleteLocation = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!id) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const location = await addlocationModel.findById(id);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    // Extract public ID for the Cloudinary image
    const publicId = location.photo.split('/').pop().split('.')[0];

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(`locations/${publicId}`);

    // Delete the location from MongoDB
    await addlocationModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT: Update location by ID
export const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name_location, space_location, owner_contact, user_type, amount, description, latitude, longitude, photo } = req.body;

  try {
    // Find the location by ID
    const location = await addlocationModel.findById(id);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    // Update the location fields
    location.name_location = name_location || location.name_location;
    location.space_location = space_location || location.space_location;
    location.owner_contact = owner_contact || location.owner_contact;
    location.user_type = user_type || location.user_type;
    location.amount = amount || location.amount;
    location.description = description || location.description;
    location.latitude = latitude || location.latitude;
    location.longitude = longitude || location.longitude;

    if (photo) {
      location.photo = photo; // Update the photo if provided
    }

    // Save the updated location
    const updatedLocation = await location.save();

    res.status(200).json({ message: "Location updated successfully", location: updatedLocation });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};
