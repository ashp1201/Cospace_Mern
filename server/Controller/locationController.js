import addlocationModel from "../Model/addlocation.model.js";

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