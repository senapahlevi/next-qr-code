"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';


function Calculate() {
  const router = useRouter();

  const handleViewAllData = () => {
    router.push('/all-data');
  };


  const [dataOrigin, setDataOrigin] = useState([]);
  const [dataDestination, setDataDestination] = useState([]);
  const [Tipe, setTipe] = useState('');
  const [Long, setLong] = useState('');
  const [Lat, setLat] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [originID, setOriginID] = useState(0);
  const [destinationID, setDestinationID] = useState(0);
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [selectListOrigin, setSelectListOrigin] = React.useState(null);
  const [selectListDestination, setSelectListDestination] = React.useState(null);
console.log(selectListOrigin,"hello select")
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/data-house');
      setDataOrigin(response.data);
      setDataDestination(response.data);
    } catch (error) {
      console.error('Error fetching dataOrigin:', error);
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
      setDataOrigin(response.data);
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


  const handleCalculate = async (value) =>{
        const destinationid = selectListDestination;
        const originid = selectListOrigin;

        try {
          const calculates = { originid, destinationid};
          await axios.post('http://localhost:8080/api/v1/calculate-route', calculates);
          fetchAddresses();
         
        } catch (error) {
          console.error('Error saving address:', error);
        }
      };

  const handleChooseOrigin = (e) => {
    setSelectListOrigin(e.target.value);
  }
  const handleChooseDestination = (e) => {
    setSelectListDestination(e.target.value);
  }

  const renderValue = (value) =>{
    const address = dataOrigin.find((item)=>{
        item.Alamat === value
    })
    return address ? address.Alamat : '';
  }


  return (
   
    <div>
            <button onClick={handleViewAllData}>Lihat Semua Data</button>
            <button onClick={handleCalculate}>Sekarang Kalkulasi</button>
            <div>
            <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Dari</InputLabel>
              <Select 
label="Dari"
value={selectListOrigin}
onChange={handleChooseOrigin}
>
{dataOrigin.map((item)=>
    <MenuItem 
    key={item.ID}
    value={item.ID}
    
    // renderValue={renderValue}
    >
            {item.Alamat}
        </MenuItem>
)}
</Select>  
</FormControl>
    </Box>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tujuan</InputLabel>
          <Select 
        label="Tujuan"
        value={selectListDestination}
        onChange={handleChooseDestination}
>
{dataDestination.map((item)=>
    <MenuItem 
    key={item.ID}
    value={item.ID}
    // renderValue={renderValue}
    >
            {item.Alamat}
        </MenuItem>
)}


</Select>  
</FormControl>
    </Box>
            </div>

    
    </div>
  );
}

export default Calculate;




