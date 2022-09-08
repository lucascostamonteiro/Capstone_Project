import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar/'
import Listings from './components/ListingsPage';
import SplashPage from './components/SplashPage';
import ListingDetails from './components/ListingDetails';
import MyListings from './components/MyListings';
import MyBookings from './components/MyBookings';
import NotFoundPage from './components/NotFoundPage';
import SearchPage from './components/SearchPage';
import { authenticate } from './store/session';
import { getListings } from './store/listing';
import { getReviews } from './store/review';
import { getBookings, getUserBookings } from './store/booking';


import './index.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getListings());
      await dispatch(getReviews());
      // await dispatch(getBookings());
      setLoaded(true);
    })();
  }, [dispatch, setLoaded]);

  useEffect(() => {
    (async () => {
      if (sessionUser) await dispatch(getUserBookings(sessionUser?.id));
    })();
  }, [dispatch, sessionUser])

  if (!loaded) return null;


  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/listings' exact={true}>
          <Listings />
        </Route>
        <Route path='/listings/:id' exact={true}>
          <ListingDetails />
        </Route>
        <Route path='/mylistings/:id' exact={true}>
          <MyListings />
        </Route>
        <Route path='/mybookings/:id' exact={true}>
          <MyBookings />
        </Route>
        <Route path='/search' exact={true}>
          <SearchPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
