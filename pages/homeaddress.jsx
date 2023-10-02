// "use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  GoogleMap,
   MarkerF,
   useLoadScript,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function HomeAddress() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  
  if (!isLoaded) return <div>Loading...</div>;
  return <Maps />;
}
function Maps() {
  const [selected, setSelected] = useState(null);
  const [Tipe, setTipe] = useState("");
  const [Long, setLong] = useState("");
  const [Lat, setLat] = useState("");
  const [inputAlamat, setInputAlamat] = React.useState("");
  useEffect(() => {
    // fetchAddresses();
    if (selected) {
      const latitude = parseFloat(selected.lat);
      const longitude = parseFloat(selected.lng);

      setLat(latitude.toString());
      setLong(longitude.toString());
    }
  }, [selected]);

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const handleSave = async () => {
    const Alamat = inputAlamat;
    try {
      const newAddress = { Alamat, Tipe, Long, Lat };
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/house`,
        newAddress
      );
      toast.success("Berhasil menyimpan data alamat!");

      // console.log(Alamat, Tipe, Long, Lat, "hello handle save");
      setTipe("");
      setLong("");
      setLat("");
     
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="bg-grey-50 mb-10">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Alamat Rumah
      </h2>
      <main class="px-5 my-12 relative max-w-md mx-auto rounded bg-gray-100">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">
            Tambah Alamat Baru
          </label>
          <div class="mt-2">
            <div>
              <div className="places-container">
                <PlacesAutocomplete
                  setSelected={setSelected}
                  setInputAlamat={setInputAlamat}
                />
              </div>

              {/* <LoadScript googleMapsApiKey="AIzaSyDM0hoZiuTA5JVkJJeNNjjkd6wlD1JP5C0"> */}
              <div className="py-10 ">
              <GoogleMap
                zoom={16}
                center={selected}
                mapContainerStyle={containerStyle}
                googleMapsApiKey="AIzaSyDM0hoZiuTA5JVkJJeNNjjkd6wlD1JP5C0"
              >
                {/* {selected && <Marker position={selected} />} */}
                {selected && <MarkerF position={selected} />}
              </GoogleMap>
              </div>
              <div>
                <label class="block text-sm font-medium leading-6 text-gray-900">
                  Tipe Rumah
                </label>
                <div class="mt-2 bg-gray-100">
                  <input
                    type="number"
                    value={Tipe}
                    onChange={(e) => setTipe(e.target.value)}
                    id="tipe"
                    class="mx-auto bg-white rounded-full h-18 lg:max-w-none border block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>{" "}
          </div>
        </div>

        <div className="px-5 py-5">
          <div className="flex justify-center gap-1 " >
            <button 
            disabled={Tipe == "" && inputAlamat == "" ? true : false} 
              type="button"
              onClick={handleSave}
              className="flex w-64 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Simpan
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const PlacesAutocomplete = ({ setSelected, setInputAlamat }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    setInputAlamat(address);
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <div className="relative w-full">
      <input
      
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="max-w-xl mx-auto bg-white rounded-full h-18 lg:max-w-none border rounded p-2 w-full focus:outline-none"
        placeholder="Search an address"
      />
      <div className="absolute z-10 bg-white shadow border rounded">
        <ul className="list-none p-0">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <li
                key={place_id}
                value={description}
                className="p-2 hover:bg-gray-100"
                onClick={() => handleSelect(description)}
              >
                {description}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};


