"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

function HomeAddress() {
  const router = useRouter();

  const handleViewAllData = () => {
    router.push("/all-data");
  };
  const handleCalculate = () => {
    router.push("/calculate");
  };

  const [addresses, setAddresses] = useState([]);
  const [Tipe, setTipe] = useState("");
  const [Long, setLong] = useState("");
  const [Lat, setLat] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/data-house`
      );
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleSave = async () => {
    const Alamat = streetAddress;
    try {
      const newAddress = { Alamat, Tipe, Long, Lat };
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/house`,
        newAddress
      );
      fetchAddresses();
      setTipe("");
      setLong("");
      setLat("");
      setSelectedOption(null);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };
  const handleUpdate = async () => {
    // try {
    //   const newAddress = { Tipe, Long, Lat };
    //   await axios.put(`http://localhost:8080/api/v1/house-update/${selectedAddressId}`, newAddress);
    //   fetchAddresses();
    //   setTipe('');
    //   setLong('');
    //   setLat('');
    //   setSelectedAddressId(null);
    // } catch (error) {
    //   console.error('Error saving address:', error);
    // }
  };
  const handleEdit = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/data-house`
      );
      setAddresses(response.data);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  console.log(searchResults, "hello search");
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
  const handleDelete = async (ID) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/house/${ID}`
      );
      fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="bg-grey-50 mb-10">

      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Cari Rute 
      </h2>

      <main class="px-5 my-12 relative max-w-md mx-auto rounded bg-gray-100">
        <div>
          <label
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Tambah Alamat Baru
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
              <div>
                <label class="block text-sm font-medium leading-6 text-gray-900">
                  Tipe Rumah
                </label>
                <div class="mt-2 bg-gray-100">
                  <input
                    type="number"
                    value={Tipe}
                    onChange={(e) => setTipe(e.target.value)}
                    id="email"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>{" "}
          </div>
        </div>

        <div className="px-5 py-5">
        <div className="flex justify-center gap-1">
            <button
              type="button"
              onClick={handleSave}
              className="flex w-64 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Simpan
            </button>

          </div>
        </div>
      </main>
      <div></div>
    </div>
  );
}

export default HomeAddress;

// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import axios from 'axios';

// export default function App() {
//   const [searchResults, setSearchResults] = React.useState([]);
//   const [selectedOption, setSelectedOption] = React.useState(null);

//   const handleSearch = async (value) => {
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1&limit=5`
//       );
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setSelectedOption(newValue);
//     if (newValue) {
//       // save the lat and lon values from the selected option
//       console.log('lat:', newValue.lat);
//       console.log('lon:', newValue.lon);
//     }
//   };

//   return (
//     <div style={{ width: 300 }}>
//       <Autocomplete
//         id="combo-box-demo"
//         options={searchResults}
//         getOptionLabel={(option) => option.display_name}
//         onInputChange={(event, newInputValue) => {
//           handleSearch(newInputValue);
//         }}
//         onChange={handleChange}
//         value={selectedOption}
//         renderInput={(params) => (
//           <TextField {...params} label="Location" variant="outlined" />
//         )}
//       />
//     </div>
//   );
// }
