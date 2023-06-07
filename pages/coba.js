import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

// Define your map component as a function
function Map() {
  // Define your state with the viewport and the marker coordinates using useState hook
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  const [marker, setMarker] = useState({
    latitude: 37.78,
    longitude: -122.41
  });

  // Define a handler for when the user clicks on the map
  const handleClick = (event) => {
    // Get the latitude and longitude from the event object
    const [longitude, latitude] = event.lngLat;

    // Update the state with the new marker coordinates using setMarker hook
    setMarker({
      latitude,
      longitude
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport} // Use setViewport hook to update the viewport
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onClick={handleClick} // Add an onClick handler to the map
    >
      <Marker {...marker}> // Add a Marker component with the state coordinates
        <div className="marker" /> // You can style the marker as you like
      </Marker>
    </ReactMapGL>
  );
}