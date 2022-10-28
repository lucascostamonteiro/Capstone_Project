import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { getGeocode, getLatLng, } from "use-places-autocomplete";

import './ListingsGoogleMaps.css';


const ListingMap = () => {

  const center = useMemo(() => ({ lat: -15.77972, lng: -47.92972 }), []);

  const allListingsObj = useSelector(state => state.listings);
  const allListings = Object.values(allListingsObj);

  const [locations, setLocations] = useState([]);


  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });



  const geoCoder = async () => {
    let LOCATIONSARRAY = Promise.all(allListings?.map(async listing => {
      console.log('DEBUG#1', listing)
      // TODO getGeoCode function breaks when adress is invalid 
      let location = await getGeocode({ address: `${listing?.address}${listing?.city}${listing?.state}` });
      console.log('DEBUG#2', location)
      let { lat, lng } = await getLatLng(location[0]);
      return [lat, lng];
    }));
    setLocations(await LOCATIONSARRAY);
  };

  useEffect(() => {
    if (isLoaded) geoCoder();
  }, [isLoaded]);


  if (!isLoaded) {
    return (
      <div>Loading...</div>
    )
  };

  return (
    isLoaded &&
    <div>
      <GoogleMap
        zoom={5}
        center={center}
        mapContainerClassName="map-container"
      >

        {locations.map(location => (
          <Marker key={location?.id} position={{ lat: Number(location[0]), lng: Number(location[1]) }} />
        ))}
      </GoogleMap>
    </div>
  );
};


export default ListingMap;
