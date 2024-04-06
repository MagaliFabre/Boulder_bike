import React, { useState, useEffect, useRef } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const MAX_ZOOM = 17;

function TomTomMapApi() {
  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(-105.270546);
  const [mapLatitude, setMapLatitude] = useState(40.014984);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});
  const [riders, setRiders] = useState([]);

  const increaseZoom = () => {
    if (mapZoom < MAX_ZOOM) {
      setMapZoom(mapZoom + 1);
      updateMap(mapLongitude, mapLatitude, mapZoom + 1);
    }
  };

  const decreaseZoom = () => {
    if (mapZoom > 1) {
      setMapZoom(mapZoom - 1);
      updateMap(mapLongitude, mapLatitude, mapZoom - 1);
    }
  };

  const updateMap = (longitude, latitude, zoom) => {
    map.setCenter([parseFloat(longitude), parseFloat(latitude)]);
    map.setZoom(zoom);
  };

  useEffect(() => {
    let mapInstance = tt.map({
      key: "859BDVwZHzYejNO0H7hT6NBE87q9xFvr",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom
    });
  
    fetch("http://localhost:3000/api/v1/riders")
      .then(response => response.json())
      .then(data => {
        setRiders(data);
        data.forEach(rider => {
          if (rider.latitude && rider.longitude) {
            const popup = new tt.Popup().setHTML(`<b>${rider.first_name} ${rider.last_name}</b>`);
            const marker = new tt.Marker()
              .setLngLat([rider.longitude, rider.latitude])
              .addTo(mapInstance)
              .setPopup(popup);
  
            marker.on("click", () => {
              popup.addTo(mapInstance);
            });
          } else {
            console.error("Missing latitude or longitude data for rider:", rider);
          }
        });
      })
      .catch(error => console.error("Error fetching riders:", error));
  
    setMap(mapInstance);
  
    return () => mapInstance.remove();
  }, []);
  
  return (
    <div className="App">
      <div className="controlButtons">
        <Button onClick={decreaseZoom} variant="contained" style={{ backgroundColor: '#424242', color: '#fff', border: 'none', marginRight: '5px' }}>
          <RemoveCircleOutlineIcon />
        </Button>
        <Button onClick={increaseZoom} variant="contained" style={{ backgroundColor: '#424242', color: '#fff', border: 'none' }}>
          <AddCircleOutlineIcon />
        </Button>
      </div>
      <div className="mapContainer">
        <div ref={mapElement} className="mapDiv" />
      </div>
    </div>
  );
}

export default TomTomMapApi;