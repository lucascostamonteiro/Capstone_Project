import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createListing } from '../../store/listing';
import './CreateListing.css'

const CreateListing = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [guest, setGuest] = useState('');
  const [bedroom, setBedroom] = useState('');
  const [bathroom, setBathroom] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    if (url.length > 0 && url.match(/http[s]?\:\/\/.*\.(png|jpg|jpeg|gif)$/)) setUrl('Please provide a valid image URL.')
    // else setUrl ('')
  }, [url])

  // if (!sessionUser) return <Redirect to="/" />;


  const handleSubmit = async (e) => {
    e.preventDefault();
    // const userId = sessionUser.id;
    // console.log('USER', userId)
    const newListing = {
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
    }

    const data = await dispatch(createListing(newListing))
    if (data.errors) {
      setErrors(data.errors)
    } else if (data) {
      history.push(`/listings/${data.id}`)
      setShowModal(false)
    }
  };



  return (
    <form className='main-create-listing'>
      <div className="errors-list">
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
      <label htmlFor="title">Title</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder='Title'
        name='title'
        required
      />
      <label htmlFor="description">Description</label>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder='Provide a description'
        name='description'
        required
      />
      <label htmlFor="price">Price</label>
      <input
        type='number'
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        placeholder='Price'
        name='price'
        required
      />
      <label htmlFor="guest">Guest(s)</label>
      <input
        type='number'
        onChange={(e) => setGuest(e.target.value)}
        value={guest}
        placeholder='Guest'
        name='guest'
        required
      />
      <label htmlFor="bedroom">Bedroom(s)</label>
      <input
        type='number'
        onChange={(e) => setBedroom(e.target.value)}
        value={bedroom}
        placeholder='Bedroom'
        name='bedroom'
        required
      />
      <label htmlFor="bathroom">Bathroom(s)</label>
      <input
        type='number'
        onChange={(e) => setBathroom(e.target.value)}
        value={bathroom}
        placeholder='Bathroom'
        name='bathroom'
        required
      />
      <label htmlFor="address">Address</label>
      <input
        type='text'
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        placeholder='Address'
        name='address'
        required
      />
      <label htmlFor="city">City</label>
      <input
        type='text'
        onChange={(e) => setCity(e.target.value)}
        value={city}
        placeholder='City'
        name='city'
        required
      />
      <label htmlFor="State">State</label>
      <input
        type='text'
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder='State'
        name='state'
        required
      />
      <label htmlFor="url">URL</label>
      <input
        type="url"
        name="url"
        onChange={(e) => setUrl(e.target.value)}
        placeholder='URL'
        value={url}
        required
      />
      <button onClick={handleSubmit}>
        Submit Listing
      </button>
    </form>
  )
};


export default CreateListing;
