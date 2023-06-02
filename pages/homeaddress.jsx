"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';


function HomeAddress() {
  const router = useRouter();

  const handleViewAllData = () => {
    router.push('/all-data');
  };
  const handleCalculate = () => {
    router.push('/calculate');
  };


  const [addresses, setAddresses] = useState([]);
  const [Tipe, setTipe] = useState('');
  const [Long, setLong] = useState('');
  const [Lat, setLat] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/data-house');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleSave = async () => {
    const Alamat = streetAddress;
    try {
      const newAddress = { Alamat, Tipe, Long, Lat };
      await axios.post('http://localhost:8080/api/v1/house', newAddress);
      fetchAddresses();
      setTipe('');
      setLong('');
      setLat('');
    } catch (error) {
      console.error('Error saving address:', error);
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
      const response = await axios.post('http://localhost:8080/api/v1/data-house');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

console.log(searchResults,"hello search")
  const handleChange = (event, newValue) => {
    setSelectedOption(newValue);
    if (newValue) {
      // save the lat and lon values from the selected option
      console.log('lat:', newValue.lat);
      setLong(newValue.lon);
      setLat(newValue.lat);
      setStreetAddress(newValue.display_name)
      console.log('lon:', newValue.lon);
    }
  };

  const handleSearch = async (value) =>{
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1&limit=5`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error saving address:', error);
    }
  }
  const handleDelete = async (ID) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/house/${ID}`);
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };



  return (
   
    <div>
            <button onClick={handleViewAllData}>Lihat Semua Data</button>
            <button onClick={handleCalculate}>Sekarang Kalkulasi</button>

      {selectedAddressId ? (
        <div>
          <h3>Edit Alamat ini {selectedAddressId}</h3>
          <div>
            <label>Judul:</label>
            <input
              type="text"
              value={Tipe}
              onChange={(e) => setTipe(e.target.value)}
            />
          </div>
          <div>
            <label>Longitude:</label>
            <input
              type="number"
              value={Long}
              onChange={(e) => setLong(e.target.value)}
            />
          </div>
          <div>
            <label>Latitude:</label>
            <input
              type="number"
              value={Lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </div>
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <h3>Tambah Alamat Baru</h3>
       
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
          <TextField {...params} label="Location" variant="outlined" />
        )}
      />
          </div>
    
          <button onClick={handleSave}>Simpan</button>
        </div>
      )}
      {/* <ul>
        {addresses.map((address) => (
          <li key={address.ID}>
            <h3>{address.Tipe}</h3>
            <h3>{address.Alamat}</h3>
            <p>Longitude: {address.Long}</p>
            <p>Latitude: {address.Lat}</p>
            <button onClick={() => handleEdit(address.ID)}>Edit</button>
            <button onClick={() => handleDelete(address.ID)}>Hapus</button>
          </li>
        ))}
      </ul> */}
      <br />
      <div>

      </div>
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

