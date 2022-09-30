import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";

import './ListingsGoogleMaps.css';



const ListingMap = () => {


  // TODO GET ALL LISTINGS FROM STATE AND CREATE MARKERS WHEN CLICKED

  const { isLoaded } = useLoadScript({
    // id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) {
    return (
      <div>Loading...</div>
    )
  };

  // const geocoder = async () => {
  //   let location = await getGeocode({ address: "490105thAveOaklandCA94603" })
  //   let { lat, lng } = await getLatLng(location[0])
  //   console.log(lat, lng);

  //   return { lat, lng }
  // };

  // geocoder();

  return (
    isLoaded &&
    <div>
      <GoogleMap
        zoom={10}
        center={{ lat: -23, lng: -46 }}
        mapContainerClassName="map-container"

        >
          // TODO LISTINGS WITH MARKERS
        {/* <Marker position={{ lat: -23, lng: -46}}/> */}
      </GoogleMap>
    </div>
  );
};


export default ListingMap;
