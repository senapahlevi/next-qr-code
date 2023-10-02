// "use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./headerweb";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getCookie } from "../utils/cookie";
import { isExpired } from "react-jwt";
import Headerweb from "./headerweb";

function AllData() {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  };

  useEffect(() => {
    fetchAddresses();
    const token = getCookie("token");
    console.log("helllo guy login", token);
    
    if (!token || isExpired(token)) {
      // Jika tidak ada token, login
      setIsLoading(false);
      router.push("/login");
    } 
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
      toast.success("Berhasil terhapus data alamat!");

    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="bg-grey-50 mb-10">
      <Headerweb />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Data Alamat Rumahs
      </h2>

      <main class=" my-12 relative max-w-l mx-auto rounded">
        {addresses.map((address) => (
          <div
            key={address.ID}
            className="max-w-sm px-5 mx-auto relative bg-gray-100 block rounded-lg"
          >
            <div className="mt-5 ">
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
              <div className="px-2 py-5">
                <div className="flex justify-center gap-1">
                  <button
                    onClick={() => handleEdit(address.ID)}
                    type="button"
                    className="flex w-48 justify-center rounded-md bg-indigo-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.ID)}
                    type="button"
                    className="flex w-48 justify-center rounded-md bg-red-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
export default AllData;
