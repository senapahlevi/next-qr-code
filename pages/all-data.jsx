"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

function AllData() {
    const router = useRouter();
    const [addresses, setAddresses] = useState([]);
    const handleEdit = (id) =>{
        router.push(`/edit/${id}`)
    }

    useEffect(() => {
        fetchAddresses();
      }, []);

    const fetchAddresses = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/data-house`);
          setAddresses(response.data);
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      };

        const handleDelete = async (ID) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/house/${ID}`);
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  


      return (
        <div>
             {/* {addresses.map((address) => (
          <li key={address.ID}>
            <h3>{address.Tipe}</h3>
            <h3>{address.Alamat}</h3>
            <p>Longitude: {address.Long}</p>
            <p>Latitude: {address.Lat}</p>
            <button onClick={() => handleEdit(address.ID)}>Edit</button>
            <button onClick={() => handleDelete(address.ID)}>Hapus</button>
          </li>
        ))} */}
        <div class="block rounded-lg bg-blue dark:bg-neutral-700">

  <div class="p-6">

  {addresses.map((address) => (
          <div key={address.ID}>
            <h3>{address.Tipe}</h3>
            <h5
      class="mb-2 text-l text-left font-medium leading-tight text-neutral-800 dark:text-neutral-50">
      {address.Alamat}
    </h5>      <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
    <p>Longitude: {address.Long}</p>
            <p>Latitude: {address.Lat}</p>
    </p>
    <div className="px-2">
      <div className="grid grid-cols-2 gap-1">
      <button
      onClick={() => handleEdit(address.ID)}
      type="button"
      className="flex w-48 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
      Edit
    </button>
      <button
      onClick={() => handleDelete(address.ID)}
      type="button"
      className="flex w-48 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
     >
      Delete
    </button>
    </div>
      </div>
            {/* <button onClick={() => handleEdit(address.ID)}>Edit</button> */}
            {/* <button onClick={() => handleDelete(address.ID)}>Hapus</button> */}
          </div>
        ))}
  
  
 
  </div>
</div>
        </div>


      )
}
    export default AllData;