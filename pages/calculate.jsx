"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import Header from './header';


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
  const [result, setResult] = useState([]);
  const [statusResult, setStatusResult] = useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [selectListOrigin, setSelectListOrigin] = React.useState(null);
  const [selectListDestination, setSelectListDestination] = React.useState(null);
console.log(selectListOrigin,"hello select")
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/data-house`);
      setDataOrigin(response.data);
      setDataDestination(response.data);
    } catch (error) {
      console.error('Error fetching dataOrigin:', error);
    }
  };

 


 


  const handleCalculate = async (value) =>{
        const destinationid = selectListDestination;
        const originid = selectListOrigin;

        try {
          const calculates = { originid, destinationid};
         const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/calculate-route`, calculates);
          setResult(response.data);

          fetchAddresses();
         
        } catch (error) {
          console.error('Error saving address:', error);
        }
      };
      console.log(result,"hello result")
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
    <Header/>
    <div className='grid grid-cols-2 gap-4'>
    <form class="space-y-6 w-96 place-content-center">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Dari Alamat</label>
        <div class="mt-2">
        <div>
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
                    </div>
                    <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Tujuan Alamat </label>

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
      </div>
    </div>

      <div className="px-5">
      <div className="grid grid-cols-3 gap-1">
          <button
          type='button'
          className="flex w-64 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
           onClick={handleCalculate}
           >Kalkulasi Jarak</button>
        
       
        </div>
      </div>
    </form>
     
    {/* {
    "haversine": "1.0172345558436935",
    "euclidean": "0.009174526396495703"
} */}
 
  
          <div>
            <h5
      class="mb-2 text-l text-left font-medium leading-tight text-neutral-800 dark:text-neutral-50">
    </h5>    

    <div className="px-2">
      <div className="grid grid-cols-2 gap-1">
    {result.euclidean}
    {result.haversine} km
    </div>
      </div>
        </div>


            </div>

    
    </div>
  );
}

export default Calculate;




