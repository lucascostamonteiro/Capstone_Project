import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBarIcons from './NavBarIcons';
import CreateListingModal from "../CreateListingModal";
// import MyListings from '../MyListings';
import './NavBar.css'


const NavBar = () => {
  const user = useSelector(state => state.session?.user);

  return (
    <nav id='nav-main'>
      <div id='navbar'>
        <div className='navbar-title'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <h3 className='title-text'>Getaway</h3>
            {/* <img
            id='logo'
            src=''
            alt='logo'
          ></img> */}
          </NavLink>
        </div>
        <div className='left-nav-div'>
          {user &&
            <CreateListingModal />
          }
          <NavBarIcons user={user} />
          {/* <MyListings /> */}
        </div>
      </div>
    </nav >
  );
};

export default NavBar;
