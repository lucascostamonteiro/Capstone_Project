import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { editListing } from '../../store/listing';
import { states } from '../../utils';
import './EditListing.css'


const EditListing = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const listing = useSelector(state => state.listings[id]);

  const [title, setTitle] = useState(listing.title);
  const [description, setDescription] = useState(listing.description);
  const [price, setPrice] = useState(listing.price);
  const [guest, setGuest] = useState(listing.guest);
  const [bedroom, setBedroom] = useState(listing.bedroom);
  const [bathroom, setBathroom] = useState(listing.bathroom);
  const [address, setAddress] = useState(listing.address);
  const [city, setCity] = useState(listing.city);
  const [state, setState] = useState(listing.state);
  const [url, setUrl] = useState(listing.url);
  const [errors, setErrors] = useState([]);



  if (!sessionUser) return <Redirect to="/" />;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedListing = {
      id,
      user_id: sessionUser.id,
      title,
      description,
      price,
      guest,
      bedroom,
      bathroom,
      address,
      city,
      state,
      url
    };

    const data = await dispatch(editListing(editedListing))
    if (data.errors) {
      setErrors(data.errors)
    } else if (data) {
      history.push(`/listings/${data.id}`)
      setShowModal(false)
    }
  }


  return (
    <form className='main-edit-listing' onSubmit={handleSubmit}>
      <div className="errors-list">
        <ul className='single-error'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
      <label htmlFor="title">Title</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        name='title'
        required
      />
      <label htmlFor="description">Description</label>
      <textarea
        className='desc-textarea'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        name='description'
        required
      />
      <div className='number-inputs'>
        <div className='price-div'>
          <label htmlFor="price">Price</label>
          <input
            className='price-input'
            type='number'
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            name='price'
            required
          />
        </div>
        <div className='guest-div'>
          <label htmlFor="guest">Guest(s)</label>
          <input
            className='guest-input'
            type='number'
            onChange={(e) => setGuest(e.target.value)}
            value={guest}
            name='guest'
            required
          />
        </div>
      </div>
      <div className='bathroom-bedroom-input'>
        <div className='bedroom-div'>
          <label htmlFor="bedroom">Bedroom(s)</label>
          <input
            type='number'
            onChange={(e) => setBedroom(e.target.value)}
            value={bedroom}
            name='bedroom'
            required
          />
        </div>
        <div className='bathroom-div'>
          <label htmlFor="bathroom">Bathroom(s)</label>
          <input
            type='number'
            onChange={(e) => setBathroom(e.target.value)}
            value={bathroom}
            name='bathroom'
            required
          />
        </div>
      </div>
      <label htmlFor="address">Address</label>
      <input
        type='text'
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        name='address'
        required
      />
      <label htmlFor="city">City</label>
      <input
        className='city-listing'
        type='text'
        onChange={(e) => setCity(e.target.value)}
        value={city}
        name='city'
        required
      />
      <label htmlFor="state">State</label>
      <select onChange={(e) => setState(e.target.value)} value={state} required >
        <option disabled value=""> </option>
        {states.map(state => (
          <option value={state} >{state}</option>
        ))}
      </select>
      <label htmlFor="url">URL</label>
      <input
        type="url"
        name="url"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        required
      />
      <div className='button-div'>
        <button
          className='edit-listing-button'
        >
          Submit Listing
        </button>
      </div>
    </form>
  )
};


export default EditListing;
