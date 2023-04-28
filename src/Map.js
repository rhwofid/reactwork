import React, { useCallback, useEffect, useRef } from "react";
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";

function Map() {
    const mapRef = useRef(null);

    const initMap = useCallback(() => {
        new window.google.maps.Map(mapRef.current, {
            center: { lat: 37.575, lng: 126.9768 },
            zoom: 16,
        });
    }, [mapRef]);

  
    useEffect(() => {
        initMap();
    }, [initMap]);

    return (
        <div
            className="map"
            style={{ width: '600px', height:'600px' }}
            ref={mapRef}
        ></div>
    );
}

export default Map;
