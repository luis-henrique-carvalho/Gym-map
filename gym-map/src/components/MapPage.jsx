import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

function MapPage() {
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: -12.14563704036159,
    lng: -38.39917072653257,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA8dMwulmsYTcZgz9v0sKLeUXWQXc_dEKs",
  });

  
  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          
        >
         
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MapPage;
