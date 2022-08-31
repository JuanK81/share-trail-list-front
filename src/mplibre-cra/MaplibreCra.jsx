import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

import trailGeoJson from '../assets/G02.geojson';

// *********** userLocation *********** //

export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
      },
      (err) => {
        alert('Unable to fetch geolocation');
        console.log(err);
        reject();
      }
    );
  });
};

// *********** /userLocation *********** //



//TODO set trail data as props to be passed from trails-list to map
export const MaplibreCra = () => {
  const [trailData, setTrailData] = useState(trailGeoJson);
  // *********** userLocation *********** //
  const [userLocation, setUserLocation] = useState([2.628862, 39.5705462]);

  useEffect(() => {
    getUserLocation().then((lnglat) => setUserLocation(lnglat));
  }, []);

  // *********** /userLocation *********** //

  const maplibreStyle = process.env.REACT_APP_MAPLIBRE_STYLE;
  const mapContainerRef = useRef();
  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: maplibreStyle,
      center: userLocation,
      zoom: 14,
    });
    map.addControl(new maplibregl.NavigationControl(), 'top-left');

    // ***** add line ***** //
    map.once('load', function () {
      map.addSource('route', {
        type: 'geojson',
        data: trailData,
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {},
        paint: {
          'line-color': '#ff0000',
          'line-width': 4,
        },
      });
    });

    // ***** add line ***** //

    new maplibregl.Marker({ color: '#FF0000' })
      .setLngLat(userLocation)
      .addTo(map);

    return () => {
      map.remove();
    };
  }, [userLocation]);

 

  return (
    <div className="map-wrap">
      <a href="https://www.maptiler.com" className="watermark">
        <img
          src="https://api.maptiler.com/resources/logo.svg"
          alt="MapTiler logo"
        />
      </a>
      <div ref={mapContainerRef} className="map" />
    </div>
  );
};

export default MaplibreCra;
