import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import UserProfile from './UserProfile';

function NavBarIcons({ user }) {


  return (
    <>
      <ul id='NavBarIcons'>
        {!user && (
          <div id='NotLoggedNavButtons'>
            <span>
              <LoginFormModal />
            </span>
            <span>
              <SignupFormModal />
            </span>
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
