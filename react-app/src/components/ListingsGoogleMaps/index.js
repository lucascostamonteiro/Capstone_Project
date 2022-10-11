import { useMemo } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { getGeocode, getLatLng, } from "use-places-autocomplete";

import './ListingsGoogleMaps.css';
import { useState } from "react";



const ListingMap = () => {

  const center = useMemo(() => ({ lat: -15.77972, lng: -47.92972 }), []);
  const allListingsObj = useSelector(state => state.listings);
  const allListings = Object.values(allListingsObj);

  // const locations = allListings.map(listing => (listing.address + ', ' + listing.city + ', ' + listing.state))



  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) {
    return (
      <div>Loading...</div>
    )
  };

  const geoCoder = async () => {
    let location = await getGeocode({ address: 'Vila Galicia, 946 Trancoso' })
    let { lat, lng } = await getLatLng(location[0])
    // console.log(lat, lng);
    return { lat, lng }
  };

  geoCoder();


  return (
    isLoaded &&
    <div>
      <GoogleMap
        zoom={5}
        center={center}
        mapContainerClassName="map-container"
      >
          // TODO LISTINGS WITH MARKERS
        <Marker position={{ lat: - 9.2670672, lng: - 35.373503 }} />
        <Marker position={{ lat: -2.797455, lng: -40.511633 }} />
        <Marker position={{ lat: -16.595360, lng: -39.110062 }} />
      </GoogleMap>
    </div>
  );
};


export default ListingMap;
