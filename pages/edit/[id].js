import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../header";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";

export default function EditData() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapEditData />;
}
const containerStyle = {
  width: "400px",
  height: "400px",
};

function MapEditData() {
  
  // state for the input value
  const router = useRouter();
  const { id } = router.query;
  
  //menerima database
  const [dataLat, setDataLat] = useState("");
  const [dataLong, setDataLong] = useState("");
  const [dataAddress, setDataAddress] = useState("");
  const [dataLocation, setDataLocation] = useState("");
  //untuk update
  const [inputAlamat, setInputAlamat] = React.useState("");
  const [Tipe, setTipe] = useState("");
  
  const [Long, setLong] = useState("");
  const [Lat, setLat] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {

    fetchAddress();
 
    if (selected) {
      const latitude = parseFloat(selected.lat);
      const longitude = parseFloat(selected.lng);
      setLat(latitude.toString());
      setLong(longitude.toString());
    }
  }, [id]);

  const fetchAddress = async () => {

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/house/${id}`
      );
      const address = response.data;
      setDataAddress(address.Alamat);
  
      
      setLat(address.Lat);
      setLong(address.Long);
      setTipe(address.Tipe);
      setSelected({lat: Number(address.Lat), lng: Number(address.Long)})
      console.log("woy hl",{lat: Number(address.Lat), lng: Number(address.Long)})
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  console.log(selected,"hello selected")

  const handleUpdate = async () => {
    const Alamat = inputAlamat;

    try {
      const updatedAddress = { Alamat,Tipe, Long, Lat };
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/house-update/${id}`,
        updatedAddress
      );
      // router.push("/");
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };


  if (!selected) {
    return null; // Jika selected belum memiliki nilai, maka return null untuk tidak merender komponen berikutnya
  }
  return (
    <div className="bg-grey-50 mb-10">
      <Header />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Edit Rute
      </h2>
      <main class=" my-12 relative max-w-l mx-auto rounded">
        <div class="max-w-md px-5 mx-auto relative bg-gray-100 block rounded-lg">
          <p className="font-medium">Alamat saat ini: {dataAddress ? dataAddress : ''}  </p>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Edit Rute
          </label>
          <div class="mt-2">
            <div>
             
              <div>
              <div className="py-6">
                {/* autocomplete */}
                <div className="places-container mb-5">
                  <PlacesAutocomplete
                    setSelected={setSelected}
                    setInputAlamat={setInputAlamat}
                    setLat={setLat}
                    setLong={setLong}
                  />
                </div>
                {/* <LoadScript googleMapsApiKey="AIzaSyDM0hoZiuTA5JVkJJeNNjjkd6wlD1JP5C0"> */}
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
                <label class="block text-sm font-medium leading-6 text-gray-900">
                  Tipe Rumah
                </label>
                <div class="mt-2 bg-gray-100">
                  <input
                    type="number"
                    value={Tipe}
                    onChange={(e) => setTipe(e.target.value)}
                    // onChange={fetchC}
                    id="tipe"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="px-5 py-5">
                <div className="flex justify-center gap-1">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="flex w-64 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const PlacesAutocomplete = ({ setSelected, setInputAlamat,setLong,setLat }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    // setValue("Serpong, Kota Tangerang Selatan, Banten, Indonesia", false);
    clearSuggestions();
    setInputAlamat(address);
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setLong(lng.toString());
    setLat(lat.toString());
  };

  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="border rounded p-2 w-full focus:outline-none"
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
