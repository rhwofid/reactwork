import { useState, useEffect } from 'react';

function Mapxy() {
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [myLatlng, setMyLatlng] = useState({ lat: 37.575, lng: 126.976  });

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA5TChzH-V9NZ7sp0JKZd2AK64_7LjFAEw&callback=initMap`;
    googleMapScript.async = true;
    window.initMap = initMap;
    document.body.appendChild(googleMapScript);

    return () => {
      document.body.removeChild(googleMapScript);
    }
  }, []);

  function initMap() {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: myLatlng,
    });

    const infoWindow = new window.google.maps.InfoWindow;

    map.addListener("click", (mapsMouseEvent) => {
      infoWindow.close();
      const lat = mapsMouseEvent.latLng.lat();

      console.log(mapsMouseEvent.latLng.lat());
      console.log(mapsMouseEvent.latLng.lng());
      const newInfoWindow = new window.google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      
      newInfoWindow.setContent(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
      newInfoWindow.open(map);

      setInfoWindow(newInfoWindow);
    });

    setMap(map);
    setInfoWindow(infoWindow);
  }

  return (
    <div id="map" style={{ width: '100%', height: '500px' }}></div>
  );
}

export default Mapxy;