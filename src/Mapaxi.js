import React, { Component } from "react";
import axios from "axios";

class Mapaxi extends Component {
  state = {
    markers: [],
    map: [],
  }

  componentDidMount() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.556, lng: 126.979 },
      zoom: 13,
      mapTypeId: 'roadmap',
    });

    const input = document.getElementById('pac-input');
    const searchBox = new window.google.maps.places.SearchBox(input);

    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });

    const createMarker = (place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log('Returned place contains no geometry');
        return;
      }

      const icon = {
        // url: place.icon,
        size: new window.google.maps.Size(71, 71),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25),
      };

      const marker = new window.google.maps.Marker({
        map,
        icon,
        title: place.name,
        position: place.geometry.location,
      });

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      axios.post('/api/location', { name: place.name, lat, lng })
        .then(res => console.log(res))
        .catch(err => console.log(err));

      // const infoWindow = new window.google.maps.InfoWindow({
      //   content: 
      //    `
      //     <div>
      //       <div>${place.name}</div>
      //       <div>위도: ${lat}</div>
      //       <div>경도: ${lng}</div>
      //     </div>
      //   `
      // });

      // marker.addListener('click', () => {
      //   infoWindow.open(map, marker);
      // });

      return marker;
    };

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      const bounds = new window.google.maps.LatLngBounds();

      const markers = places.map((place) => createMarker(place));

      markers.forEach((marker) => {
        bounds.extend(marker.getPosition());
      });

      map.fitBounds(bounds);
      this.setState({ markers });
    });
  }

  render() {
    return (
      <div>
        <input id="pac-input" type="text" placeholder="Search Box" />
        <div id="map" style={{ height: '500px' }}></div>
      </div>
    );
  }
}

export default Mapaxi;
