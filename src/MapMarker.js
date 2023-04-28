import React, { useState, useRef, useEffect } from "react";

function MapMarker() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let labelIndex = 0;

  useEffect(() => {
    const initMap = () => {
      const bangalore = { lat: 37.575, lng: 126.976 };
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: bangalore,
      });
      setMap(map);
      window.google.maps.event.addListener(map, "click", (event) => {
        addMarker(event.latLng, map);
      });
      // addMarker(map);
    };
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA5TChzH-V9NZ7sp0JKZd2AK64_7LjFAEw`;
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  const addMarker = (location, map) => {
    const marker = new window.google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map,
    });
    setMarkers([...markers, marker]);
  };

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "400px", marginTop: "20px" }}
    />
  );
}

export default MapMarker;