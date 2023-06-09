import React, { Component } from 'react';

class Mapsearch extends Component {
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

    let markers = [];

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      const bounds = new window.google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log('Returned place contains no geometry');
          return;
        }

        const icon = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25),
        };

        markers.push(
          new window.google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
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

export default Mapsearch;