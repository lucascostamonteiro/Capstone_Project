import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar/'
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import Listings from './components/ListingsPage';
import SplashPage from './components/SplashPage';
import ListingDetails from './components/ListingDetails';
import MyListings from './components/MyListings';
import { authenticate } from './store/session';
import { getListings } from './store/listing';
import { getReviews } from './store/review';
import './index.css'


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getListings());
      await dispatch(getReviews());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
        <Route path='/listings' exact={true}>
          <Listings />
        </Route>
        <Route path='/listings/:id'>
          <ListingDetails />
        </Route>
        <Route path='/mylistings/:userId' exact={true}>
          <MyListings />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
