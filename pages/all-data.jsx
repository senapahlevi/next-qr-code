"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "./header";

function AllData() {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  };

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
      <Header />
      {/* <div className="mt-5 block rounded-lg bg-red-50 dark:bg-neutral-700">
        <div class="p-6 mt-5">
          {addresses.map((address) => (
            <div key={address.ID} className="mt-5">
              <h3>Tipe Rumah: {address.Tipe}</h3>
              <h5 class="mb-2 text-l text-left font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Alamat:{address.Alamat}
              </h5>{" "}
              <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
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
            </div>
          ))}
        </div>
      </div> */}

      <main class="py-28 relative z-20 max-w-l mx-auto">
        <div class="max-w-sm px-4 mx-auto">
          {addresses.map((address) => (
            <div key={address.ID} className="mt-5 ">
              <div className="">
                <h3>Tipe Rumah: {address.Tipe}</h3>
              </div>
              <h5 class="mb-2 text-l text-left font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Alamat:{address.Alamat}
              </h5>{" "}
              <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                <p>Longitude: {address.Long}</p>
                <p>Latitude: {address.Lat}</p>
              </p>
              <div className="px-2">
                <div className="flex justify-center gap-1">
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
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
export default AllData;