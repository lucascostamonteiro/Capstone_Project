import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { getGeocode, getLatLng, } from "use-places-autocomplete";
import './ListingsGoogleMaps.css';


const ListingMap = ({ hoveredListing }) => {
  const center = useMemo(() => ({ lat: -15.77972, lng: -47.92972 }), []);

  const allListingsObj = useSelector(state => state.listings);
  const allListings = Object.values(allListingsObj);

  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState([]);

  const activeListingId = hoveredListing?.id || null;


  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  // , componentRestrictions: { country: 'BR' }

  // const geoCoder = async () => {
  //   let LOCATIONSARRAY = Promise.all(allListings?.map(async listing => {
  //     try {
  //       let location = await getGeocode({ address: `${listing?.address}${listing?.city}${listing?.state}` });
  //       let { lat, lng } = await getLatLng(location[0]);
  //       if (lat && lng) return [lat, lng];
  //     } catch (error) {
  //       setErrors("This is an invalid address")
  //     }
  //   }));
  //   let allLocations = (await LOCATIONSARRAY).filter(location => location !== undefined);
  //   setLocations(allLocations);
  // };

  const geoCoder = async () => {
    let allLocations = [];
    for (const listing of allListings) {
      try {
        const location = await getGeocode({
          address: `${listing?.address}${listing?.city}${listing?.state}`,
          componentRestrictions: { country: 'BR' }
        });
        const { lat, lng } = await getLatLng(location[0]);
        if (lat && lng) {
          allLocations.push({ id: listing.id, lat, lng });
        }
      } catch (error) {
        setErrors("This is an invalid address");
      }
    }
    setLocations(allLocations);
  };

  useEffect(() => {
    if (isLoaded) geoCoder();
  }, [isLoaded]);


  if (!isLoaded) {
    return (
      <div>Loading...</div>
    )
  };

  if (errors.length > 0) {
    return (
      <div>Error: {errors}</div>
    );
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
            <Marker
              key={location?.id}
              // position={{ lat: Number(location[0]), lng: Number(location[1]) }}
              position={{ lat: Number(location.lat), lng: Number(location.lng) }}
              visible={activeListingId === location.id}
            />
          </div>
        ))}
      </GoogleMap>
    </div>
  );
};


export default ListingMap;
