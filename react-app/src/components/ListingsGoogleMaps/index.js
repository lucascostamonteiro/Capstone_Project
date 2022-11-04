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
  const [errors, setErrors] = useState([]);


  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });


  // TODO -- change database to include lat and lng
  // TODO --  move geoCoder to create and edit listing to get the lat and lng from address once its created
  // TODO -- validate address before saving in database
  // TODO -- pass lat and lng to Marker component



  const geoCoder = async () => {
    let LOCATIONSARRAY = Promise.all(allListings?.map(async listing => {
      try {
        let location = await getGeocode({ address: `${listing?.address}${listing?.city}${listing?.state}`, componentRestrictions: { country: 'BR' } });
        console.log('DEBUG', location)
        let { lat, lng } = await getLatLng(location[0]);
        console.log('DEBUG++++', lat, lng)
        return [lat, lng];
      } catch (error) {
        console.log(error)
        setErrors("This is an invalid address")

      }
    }));
    console.log('locations', LOCATIONSARRAY)
    setLocations(await LOCATIONSARRAY);
  };


  console.log('LOCATIONS', locations)

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
          {locations?.length && locations?.map(location => (
            <div key={location?.id}>
            <Marker key={location?.id} position={{ lat: Number(location[0]), lng: Number(location[1]) }} />
          </div>
        ))}
      </GoogleMap>
    </div>
  );
};


export default ListingMap;
