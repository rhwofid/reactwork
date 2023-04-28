import React, { myLatLng } from "react";

function Map3 () {
    
    const myLatLng = { lat: 36.363, lng: 126.044 };
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatLng,
    });

    new window.google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
    
    return(
    <div
    className="map"
    style={{ width: '600px', height:'600px' }}
    ref={myLatLng}></div>
    );
  }
  
  export default Map3;