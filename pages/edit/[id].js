import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import Header from "../header";

function EditData() {
  const [searchResults, setSearchResults] = React.useState([]);
  const [streetAddress, setStreetAddress] = useState("");
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [inputValue, setInputValue] = useState(""); // state for the input value
  const router = useRouter();
  const { id } = router.query;
  const [address, setAddress] = useState("");
  const [Long, setLong] = useState("");
  const [Lat, setLat] = useState("");
  useEffect(() => {
    if (id) {
      // fetchAddress();
    }
  }, [id]);
  const Alamat = streetAddress;

  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/house/${id}`
      );
      const address = response.data;
      setAddress(address.Alamat);
      setLong(address.Long);
      setLat(address.Lat);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedOption(newValue);
    if (newValue) {
      // save the lat and lon values from the selected option
      console.log("lat:", newValue.lat);
      setLong(newValue.lon);
      setLat(newValue.lat);
      setStreetAddress(newValue.display_name);
      console.log("lon:", newValue.lon);
    }
  };

  const handleSearch = async (value) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1&limit=5`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedAddress = { Alamat, Long, Lat };
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/house-update/${id}`,
        updatedAddress
      );
      router.push("/");
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="bg-grey-50 mb-10">
      <Header />

      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Edit Rute
      </h2>

      <main class=" my-12 relative max-w-l mx-auto rounded">
        <div class="max-w-sm px-5 mx-auto relative bg-gray-100 block rounded-lg">
          <label className="block text-sm font-medium leading-6 text-gray-900">
           Edit Rute
          </label>
          <div class="mt-2">
            <div>
              <div>
                <Autocomplete
                  id="combo-box-demo"
                  options={searchResults}
                  getOptionLabel={(option) => option.display_name}
                  onInputChange={(event, newInputValue) => {
                    handleSearch(newInputValue);
                  }}
                  onChange={handleChange}
                  value={selectedOption}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      variant="outlined"
                    />
                  )}
                />
              </div>

              <div className="px-5 py-5">
                <div className="flex justify-center gap-1">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="flex w-64 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditData;
