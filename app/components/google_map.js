"use client";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Skeleton from "@mui/material/Skeleton";
import { useMemo } from "react";

export default function GMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const center = useMemo(() => ({ lat: 36.0349379, lng: -86.6335761 }), []);

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "600px" }}
        center={center}
        zoom={18}
      >
        <Marker position={center} />
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  return (
    <div
      id="map-section"
      className="mb-[30px] h-[600px] w-full md:mb-[40px] mh9:mb-[50px] mh12:mb-[60px]"
    >
      {isLoaded ? (
        renderMap()
      ) : (
        <Skeleton variant="rectangular" width={"100%"} height={600} />
      )}
    </div>
  );
}
