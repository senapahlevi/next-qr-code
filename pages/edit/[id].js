import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';

function EditData() {
    const [searchResults, setSearchResults] = React.useState([]);
    const [streetAddress, setStreetAddress] = useState('');

    const [selectedOption, setSelectedOption] = React.useState(null);
      const [inputValue, setInputValue] = useState(''); // state for the input value
console.log(inputValue,"hello input")
  const router = useRouter();
  const { id } = router.query;
  console.log(router,"hello router")
  const [address, setAddress] = useState('');
  const [Long, setLong] = useState('');
  const [Lat, setLat] = useState('');
console.log(id,"hello  id")
  useEffect(() => {
    if (id) {
      fetchAddress();
    }
  }, [id]);
  const Alamat = streetAddress;

//     const handleInputChange = (event, newInputValue) => {
//     setInputValue(newInputValue); // update the input value
//     handleSearch(newInputValue); // perform the search
//   };
  const fetchAddress = async () => {
    
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/house/${id}`
      );
      const address = response.data;
    //   const defaultOption = searchResults.find(option => option.display_name === address.Alamat);
    //     setSelectedOption(defaultOption);
    //   setInputValue(defaultOption.display_name);
      setAddress(address.Alamat);
      setLong(address.Long);
      setLat(address.Lat);
      
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

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

  const handleUpdate = async () => {
    try {
      const updatedAddress = { Alamat, Long, Lat };
      await axios.put(`http://localhost:8080/api/v1/house-update/${id}`, updatedAddress);
      router.push('/');
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  return (
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
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditData;
