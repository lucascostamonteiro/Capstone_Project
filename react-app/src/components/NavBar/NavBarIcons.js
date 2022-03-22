import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import UserProfile from './UserProfile';

function NavBarIcons({ user }) {


  return (
    <>
      <ul id='NavBarIcons'>
        {!user && (
          <div id='NotLoggedNavButtons'>
            <li>
              <LoginFormModal />
            </li>
            <li>
              <SignupFormModal />
            </li>
          </div>
        )}
        {user &&
          <UserProfile />
        }
      </ul>
    </>
  );
}

export default NavBarIcons;
