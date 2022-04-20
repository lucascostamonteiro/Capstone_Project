import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import * as moment from 'moment';
import EditBookingModal from '../EditBookingModal';
import { deleteBooking } from '../../store/booking';
import './MyBookings.css'


const MyBookings = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const bookingsObj = useSelector(state => state.bookings);
  const bookings = Object.values(bookingsObj).reverse();
  const listingsObj = useSelector(state => state.listings);
  const listings = Object.values(listingsObj);
  const userBookings = bookings.filter(singleBooking => singleBooking?.user_id === sessionUser?.id).reverse();


  const handleImgError = (e) => {
    e.target.src = '../../../../static/not-image.png';
  }

  const handleDelete = async (e, booking) => {
    e.preventDefault();
    await dispatch(deleteBooking(booking))
  }

  if (!sessionUser) return Redirect('/');

  if (sessionUser?.id !== +id) history.push('/page-not-found');


  return (
    <>
      <span className="return-link">
        <Link className="return-link" to={'/listings/'}>
          <span className="return-link"><i className="fa-solid fa-arrow-left"></i> Return to all listings</span>
        </Link>
      </span>
      <div>
        <h3 className="bookings-page-title">My Bookings</h3>
      </div>
      {!userBookings.length && sessionUser?.id === +id ?
        <div className='no-bookings-title-div'>
          <h4 className='no-bookings-title'>You don't have any bookings yet</h4>
        </div> :
        <div>
          {userBookings?.map(booking => (
            <div key={booking.id} className='main-booking-div'>
              <Link className="link-image" to={`/listings/${listings[booking.listing_id]}`}>
                <img
                  className='image-listings'
                  crossOrigin="anonymous"
                  src={listings[booking?.listing_id - 1]?.url}
                  alt={""}
                  onError={handleImgError}
                />
              </Link>
              <div className='bookings-info'>
                <span className="main-listings-title"> {listings[booking?.listing_id - 1]?.title}</span>
                <span className="main-listings-location"> {listings[booking?.listing_id - 1]?.address}</span>
                <span className="main-listings-location"> {listings[booking?.listing_id - 1]?.city}, {listings[booking?.listing_id - 1]?.state}</span>
                <span className="main-listings-date"> <strong> Start Date: </strong> {moment(booking?.start_date).format('LL')}</span>
                <span className="main-listings-date"> <strong> End Date: </strong> {moment(booking?.end_date).format('LL')}</span>
                <span className="main-listings-guest"> <strong>Guests: </strong> {booking?.guest}</span>
                {/* <span> <strong> Total: </strong> {moment(booking?.end_date).diff(moment(booking?.start_date, 'days')) * booking?.price}</span> */}
                <span><EditBookingModal booking={booking} /></span>
                <span> <button id='delete-booking-button' onClick={(e) => handleDelete(e, booking)}>Delete</button></span>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  )
}


export default MyBookings;
