import React, { useMemo, useRef, useState } from "react";

import "./AddLocation.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { addLocation } from "../helper/helper";


const currencies = [
  { value: "free", label: "Free" },
  { value: "basic", label: "Basic" },
  { value: "advance", label: "Advance" },
];

function AdminLocation() {
  const [postImage, setPostImage] = useState(null);
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 19.076,
    longitude: 72.8777,
  });
  const markerRef = useRef(null);

  const handleLocationSelect = (e) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation({ latitude: lat, longitude: lng });
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        const { lat, lng } = marker.getLatLng();
        setSelectedLocation({ latitude: lat, longitude: lng });
      },
    }),
    [markerRef]
  );

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setPostImage(file);
  };

  const formik = useFormik({
    initialValues: {
      name_location: "",
      space_location: "",
      owner_contact: "",
      user_type: "free",
      amount: "",
      photo: postImage,
      description: "",
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values.latitude = selectedLocation.latitude;
      values.longitude = selectedLocation.longitude;
      values.photo = postImage;

      let locationPromise = addLocation(values);
      toast.promise(locationPromise, {
        loading: "Adding data ....",
        success: <b>Data Added Successfully..!</b>,
        error: <b>Could not Register Data...!</b>,
      });

      locationPromise
        .then(() => {
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <div className="addlocation">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="add_location_text">Add Location</h2>
      <form
        className="addlocation_container"
        onSubmit={formik.handleSubmit}
      >
        <div className="field_row">
          <div className="fields">
            <label htmlFor="name_location">Name of Location</label>
            <TextField
              {...formik.getFieldProps("name_location")}
              className="textfield"
              variant="outlined"
            />
          </div>

          <div className="fields">
            <label htmlFor="space_location">Space of Location</label>
            <TextField
              {...formik.getFieldProps("space_location")}
              className="textfield"
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
              variant="outlined"
            />
          </div>
          <div className="fields">
            <label htmlFor="user_type">User Type</label>
            <TextField
              className="textfield"
              select
              label="Select"
              {...formik.getFieldProps("user_type")}
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
              startAdornment={<InputAdornment position="start">₹</InputAdornment>}
              label="Amount"
              {...formik.getFieldProps("amount")}
            />
          </div>
          <div className="fields">
            <label htmlFor="photo">Upload Photo</label>
            <input
              className="textfield"
              type="file"
              accept=".jpeg,.png,.jpg"
              onChange={handleFileUpload}
            />
          </div>
        </div>
        <div className="field_row">
          <div className="fields">
            <label htmlFor="description">Description</label>
            <TextField
              className="all_features_field"
              label="All features describe here"
              multiline
              maxRows={4}
              {...formik.getFieldProps("description")}
            />
          </div>
          <div className="fields">
            <MapContainer
              center={[selectedLocation.latitude, selectedLocation.longitude]}
              zoom={10}
              style={{ width: "40vw", height: "200px" }}
              onClick={handleLocationSelect}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[selectedLocation.latitude, selectedLocation.longitude]}
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
