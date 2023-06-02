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
          const response = await axios.get('http://localhost:8080/api/v1/data-house');
          setAddresses(response.data);
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      };

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
          hellow
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
        </div>
      )
}
    export default AllData;