// "use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import Header from "./header";
import { GoogleMap, Marker, MarkerF, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { toast } from "react-toastify";
import { getCookie } from "../utils/cookie";
import { isExpired } from "react-jwt";

export default function Calculate() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapCalculate />;
}

function MapCalculate() {

  const [dataOrigin, setDataOrigin] = useState([]);
  const [dataDestination, setDataDestination] = useState([]);
  const [dataOther, setDataOther] = useState([]);

  const [result, setResult] = useState([]);
  const [statusResult, setStatusResult] = useState(false);

  const [show, setShow] = useState(false);

  const [selectListOrigin, setSelectListOrigin] = React.useState(null);
  const [selectListDestination, setSelectListDestination] = React.useState(null);
  const [selectListOther, setSelectListOther] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
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
      setDataOrigin(response.data);
      setDataDestination(response.data);
      setDataOther(response.data);

    } catch (error) {
      console.error("Error fetching dataOrigin:", error);
    }
  };

  const handleCalculate = async (value) => {
    const destinationid = selectListDestination;
    const originid = selectListOrigin;
    const otherid = selectListOther;
    const other_status = 0;
    if (selectListOther > 0){
      other_status = 1;
    }
    try {
      const calculates = { originid, destinationid, otherid,other_status };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/calculate-route`,
        calculates
      );
      setResult(response.data);
      setStatusResult(true);
      fetchAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

    // create a function to toggle the visibility of the div
    const handleClick = () => {
      setShow(!show);
      setSelectListOther(null);
    };
  const handleChooseOrigin = (e) => {
    setSelectListOrigin(e.target.value);
  };
  const handleChooseDestination = (e) => {
    setSelectListDestination(e.target.value);
  };
  const handleChooseOther = (e) => {
    setSelectListOther(e.target.value);
  };

  const containerStyle = {
    width: "400px",
    height: "400px",
  };


  return (
    <div className="bg-grey-50 mb-10">
      <Header />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Kalkulasi Rute
      </h2>
      <main class="my-12 relative max-w-l mx-auto rounded ">
        <div class="max-w-sm px-5 mx-auto relative block rounded-lg bg-gray-100">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Dari Alamat
          </label>
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
                      {dataOrigin.map((item) => (
                        <MenuItem
                          key={item.ID}
                          value={item.ID}

                          // renderValue={renderValue}
                        >
                          {item.Alamat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Tujuan Alamat
                </label>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tujuan
                    </InputLabel>
                    <Select
                      label="Tujuan"
                      value={selectListDestination}
                      onChange={handleChooseDestination}
                    >
                      {dataDestination.map((item) => (
                        <MenuItem
                          key={item.ID}
                          value={item.ID}
                          // renderValue={renderValue}
                        >
                          {item.Alamat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div>
              <button onClick={handleClick}>Tambah Tujuan</button>

              </div>
              <div hidden={show ? false : true }>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                   Alamat Lainnya
                </label>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Alamat Lainnya
                    </InputLabel>
                    <Select
                      label="Other"
                      value={selectListOther}
                      onChange={handleChooseOther}
                    >
                      {dataOther.map((item) => (
                        <MenuItem
                          key={item.ID}
                          value={item.ID}
                          // renderValue={renderValue}
                        >
                          {item.Alamat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
          </div>
          <div className="px-5 py-5">
            <div className="flex justify-center gap-1 mt-5">
              <button
                type="button"
                className="flex w-64 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleCalculate}
              >
                Kalkulasi Jarak
              </button>
            </div>

            <div></div>
          </div>
        </div>
      </main>
      <div class="my-12 relative max-w-l mx-auto rounded ">
        <div class="py-5 max-w-md px-5 mx-auto relative block rounded-lg bg-gray-100">
          {statusResult == true ? (
            <div>
              {/* <LoadScript googleMapsApiKey="AIzaSyDM0hoZiuTA5JVkJJeNNjjkd6wlD1JP5C0"> */}
              <GoogleMap
                zoom={10}
                center={{ lat: result.origin_lat, lng: result.origin_long }}
                mapContainerStyle={containerStyle}
                googleMapsApiKey="AIzaSyDM0hoZiuTA5JVkJJeNNjjkd6wlD1JP5C0"
              >
                {/* {selected && <Marker position={selected} />} */}
                {statusResult && (
                  <MarkerF
                    position={{
                      lat: result.destination_lat,
                      lng: result.destination_long,
                    }}
                  />
                )}
                {result.destination_lat && (
                  <MarkerF
                    position={{
                      lat: result.origin_lat,
                      lng: result.origin_long,
                    }}
                  />
                )}
                {statusResult && (
                  <Marker
                    position={{
                      lat: result.other_lat,
                      lng: result.other_long,
                    }}
                  />
                )}
              </GoogleMap>
              <div className="flex justify-center gap-1 mt-5">
                {/* Euclidean: {result.euclidean} */}
              </div>
              <div className="flex justify-center gap-1">
                Jarak: {result.haversine} km
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
