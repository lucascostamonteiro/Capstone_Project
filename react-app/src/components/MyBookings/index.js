import { useSelector } from 'react-redux'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import './MyBookings.css'


const MyBookings = () => {
  const { id } = useParams();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const bookingsObj = useSelector(state => state.bookings);
  const bookings = Object.values(bookingsObj);
  const listings = useSelector(state => state.listings);
  console.log('+++Booking', bookings)
  console.log('+++listings', listings)
  // const userListings = listings.filter(singleListing => singleListing?.user_id === sessionUser?.id).reverse();


  if (!sessionUser) return Redirect('/');

  if (sessionUser?.id !== +id) history.push('/page-not-found');

  return (
    <>
      <span className="return-link">
        <Link className="return-link-text" to={'/listings/'}>
          <span className="return-link-text"><i className="fa-solid fa-arrow-left"></i> Return to all listings</span>
        </Link>
      </span>
      <div>
        <h3 className="bookings-page-title">My Bookings</h3>
      </div>
      {!bookings.length ?
        <div>
          <h4>You don't have any bookings yet</h4>
        </div> :
        <div>
          {bookings?.map((booking, idx) => (
            <div key={idx}>
              {/* {booking.startDate}
              {booking.endDate} */}
              {booking.guest}
            </div>
          ))}
        </div>

      }

    </>
  )
}


export default MyBookings;
