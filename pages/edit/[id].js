import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';

function EditData() {
  const [searchResults, setSearchResults] = React.useState([]);
  const [streetAddress, setStreetAddress] = useState('');
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [inputValue, setInputValue] = useState(''); // state for the input value
  const router = useRouter();
  const { id } = router.query;
  const [address, setAddress] = useState('');
  const [Long, setLong] = useState('');
  const [Lat, setLat] = useState('');
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/house/${id}`
      );
      const address = response.data;
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
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/house-update/${id}`, updatedAddress);
      router.push('/');
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  return (
    <div>
      <div
  class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
  
  <div class="p-6">
    <h5
      class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
      Edit Data Rute
    </h5>
    {/* <Autocomplete
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
      /> */}
    <div className="px-2 mb-5">
      <div className="grid grid-cols-2 gap-1">

    {/* <button
    onClick={handleUpdate}
      type="button"
      className="flex w-48 justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      Update
    </button> */}

      </div>
    </div>
  </div>
</div>

<form class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Tambah Alamat Baru</label>
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
          <TextField {...params} label="Location" variant="outlined" />
        )}
      />
          </div>
    
        </div>        </div>
      </div>

      <div className="px-5">
      <div className="grid grid-cols-3 gap-1">
          <button 
          type='button'
          onClick={handleUpdate}
          className="flex w-64 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Update
          </button>
          
         
        
       
        </div>
      </div>
    </form>
     
     </div>
  );
}

export default EditData;
