import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import SingleListing from '../SingleListing';


const SearchPage = () => {
  const allListingsObj = useSelector(state => state.listings);
  const allListings = Object.values(allListingsObj).reverse();
  const location = useLocation();

  const searchArr = allListings.filter(({ city, state }) => {
    return city.toLowerCase().includes(location.state.detail.toLowerCase()) ||
      state.toLowerCase().includes(location.state.detail.toLowerCase())
  })


  return (
    <>
      <span className="return-link">
        <Link className="return-link" to={'/listings/'}>
          <span className="return-link"><i className="fa-solid fa-arrow-left"></i> Return to all listings</span>
        </Link>
      </span>
      <div className='search-page-container'>
        <div><h1 className="search-page-title">Search Results for "{location.state.detail}"</h1></div>
        {searchArr?.map(listing => (
          <SingleListing listing={listing} />
        ))}
      </div>
    </>
  )
};

export default SearchPage;
