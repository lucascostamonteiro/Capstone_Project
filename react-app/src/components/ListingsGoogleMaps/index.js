import { useMemo } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { getGeocode, getLatLng, } from "use-places-autocomplete";

import './ListingsGoogleMaps.css';



const ListingMap = () => {

  const center = useMemo(() => ({ lat: -15.77972, lng: -47.92972 }), []);
  const allListingsObj = useSelector(state => state.listings);
  const allListings = Object.values(allListingsObj);


  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) {
    return (
      <div>Loading...</div>
    )
  };

  const geoCoder = async (address, city) => {
    let location = await getGeocode({ address: "{{address}{city}}" })
    let { lat, lng } = await getLatLng(location[0])
    console.log(lat, lng);
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
          {allListings.map(listing => (
          <Marker position={{ lat: - 9.2670672, lng: - 35.373503 }} />
          // <Marker position={{ lat: Number(listing?.lat), lng: Number(listing?.lng) }} />
        ))}
      </GoogleMap>
    </div>
  );
};


export default ListingMap;
