import { useState, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function Coba() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
 
const containerStyle = {
  width: "400px",
  height: "400px",
};
function Map() {
  const center = { lat: 43.45, lng: -80.49 };
  const [selected, setSelected] = useState(null);
  console.log("selected", selected);
  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
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
      {/* </LoadScript> */}
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
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

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    console.log("horree", lat, lng);
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
