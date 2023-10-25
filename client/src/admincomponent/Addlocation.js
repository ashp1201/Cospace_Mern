import React, { useEffect, useMemo, useRef, useState } from "react";

import "./AddLocation.css";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";


import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import { Marker } from "react-leaflet/Marker";
import "leaflet/dist/leaflet.css";
import { addLocation } from "../helper/helper";


const currencies = [
  {
    value: "free",
    label: "Free",
  },
  {
    value: "basic",
    label: "Basic",
  },
  {
    value: "advance",
    label: "Advance",
  },
];

function AdminLocation() {


  const [postImage,setPostImage]=useState(null)
  
var base64String="";
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 19.076,
    longitude: 72.8777,
  });
  const markerRef = useRef(null);
  const handleLocationSelect = (e) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation({ latitude: lat, longitude: lng });
    console.log("1:",selectedLocation)
  };

  // const eventHandlers = useMemo(
  //   () => ({
  //     dragend() {
  //       const marker = markerRef.current;
  //       console.log("Marker dragged");
  //       const { lat, lng } = marker.getLatLng();
  //       console.log(lat,lng)
  //       setSelectedLocation({ latitude: lat, longitude: lng });
  //       console.log("2:",selectedLocation)
  //     },
  //   }),
  //   []
  // );

  // useEffect(() => {
  //   // This effect will run whenever selectedLocation changes.
  //   console.log("Selected Location:", selectedLocation);
  // }, [selectedLocation]);
  
  // ...
  
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        console.log("Marker dragged");
        const { lat, lng } = marker.getLatLng();
        // console.log(lat,lng)
        setSelectedLocation({ latitude: lat, longitude: lng });
      },
    }),
    [markerRef]
  );
  
  // ...
  // By adding a useEffect, you can ensure that the updated selectedLocation is logged after it has been updated by setSelectedLocation. This way, you'll be able to see the correct value in your log statements.
  
  // Make sure to adjust your component logic accordingly based on the updated selectedLocation.
  
  
  
  
  
  
  // Regenerate
  
  const handleFileUpload=async(e)=>{
   
      var file=e.target.files[0];

      setPostImage(file);

    
  };

  const formik = useFormik({
    initialValues: {
      name_location: "", // Modify field names according to your form
      space_location: "", // Modify field names according to your form
      owner_contact: "", // Modify field names according to your form
      user_type: "free", // Set default value
      amount: "",
      // photo: base64String,
      photo: postImage,
      description: "",
      latitude: selectedLocation.latitude, // Initialize with the current latitude
    longitude: selectedLocation.longitude,
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values.latitude = selectedLocation.latitude;
    values.longitude = selectedLocation.longitude;
    //   console.log(selectedLocation.latitude);
    //   console.log(selectedLocation.longitude)
      values.photo = postImage; 
    //   console.log(postImage)
    //   console.log(typeof postImage)
      console.log("Form Values:", values);
      let locationPromise =addLocation(values);
      toast.promise(locationPromise,{
        loading:'Adding data ....',
        success: <b>Data Added Successfully..!</b>,
        error: <b>Could not Register Data...!</b>
      })
      locationPromise
      .then(res=> {
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000); // 1000 milliseconds = 1 second
      })
      .catch((error)=>{
        console.log(error)
      })
    },
  });

  return (
    <div className="addlocation">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <h2 className="add_location_text">Add Location</h2>
      <form
        action="/home"
        className="addlocation_container"
        onSubmit={formik.handleSubmit}
      >
        <div className="field_row">
          <div className="fields">
            <label htmlFor="name_location">Name of Location</label>
            <TextField
              {...formik.getFieldProps("name_location")}
              className="textfield"
              name="name_location"
              id="outlined-basic"
              variant="outlined"
            />
          </div>

          <div className="fields">
            <label htmlFor="space_location">Space of Location</label>
            <TextField
              {...formik.getFieldProps("space_location")}
              name="space_location"
              className="textfield"
              id="outlined-basic"
              variant="outlined"
            />
          </div>
        </div>
        <div className="field_row">
          <div className="fields">
            <label htmlFor="owner_contact">Owner Contact</label>
            <TextField
              {...formik.getFieldProps("owner_contact")}
              className="textfield"
              name="owner_contact"
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          <div className="fields">
            <label htmlFor="user_type"></label>
            <TextField
              className="textfield"
              id="outlined-select-currency"
              name="user_type"
              select
              label="Select"
              {...formik.getFieldProps("user_type")}
              helperText="Select the type of users to get access this location"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div className="field_row">
          <div className="fields">
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <TextField
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">₹</InputAdornment>
              }
              label="Amount"
              name="amount"
              {...formik.getFieldProps("amount")}
            />
          </div>
          <div className="fields">
            <label htmlFor="photo">Upload Photo</label>
            <input
              className="textfield"
              name="photo"
              type="file"
              accept=".jpeg,.png,.jpg"
              onChange={(e) => {
                // formik.setFieldValue("photo",handleFileUpload(e) );
                handleFileUpload(e)
              }}
            />
          </div>
        </div>
        <div className="field_row">
          <div className="fields">
            <label htmlFor="description">Description</label>
            <TextField
              className="all_features_field"
              id="outlined-multiline-flexible"
              label="All features describe here"
              multiline
              maxRows={4}
              {...formik.getFieldProps("description")}
            />
          </div>
          <div className="fields">
            <MapContainer
              center={[
                selectedLocation.latitude,
                selectedLocation.longitude,
              ]}
              zoom={10}
              style={{ width: "40vw", height: "200px" }}
              onClick={handleLocationSelect}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  selectedLocation.latitude,
                  selectedLocation.longitude,
                ]}
                draggable={true}
                eventHandlers={eventHandlers}
                ref={markerRef}
              >
                <Popup>Selected Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
        <div className="btn-admin">
          <Button
            type="submit"
            name="btn_adminlogin"
            className="btnad"
            variant="contained"
            color="secondary"
          >
            Add Location
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminLocation;
