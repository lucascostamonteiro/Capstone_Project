import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createListing } from '../../store/listing';
import { Redirect, useHistory } from 'react-router-dom';

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


  // TODO Check in the backend
  // useEffect(() => {
  //   const validationErrors = []
  //   if (price > 5000 || price < 1) validationErrors.push("Price must be between $1 - $5000");
  //   if (guest > 20 || guest < 1) validationErrors.push('Number of guests must be between 1 - 20');
  //   if (bedroom > 10 || bedroom < 1) validationErrors.push('Number of bedrooms must be between 1 - 10');
  //   if (bathroom > 10 || bathroom < 1) validationErrors.push('Number of bathrooms must be between 1 - 10');

  //   setErrors(validationErrors)
  // }, [price, guest, bedroom, bathroom])


  if (!sessionUser) return <Redirect to="/" />;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = sessionUser.id;
    const newListing = {
      userId,
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

    const data = await dispatch(createListing(newListing))
    if (data.errors) {
      setErrors(data.errors)
    } else if (data) {
      history.push(`/listings/${data.id}`)
      setShowModal(false)
    }
  }


  return (
    <form>
      <div className="errors-list">
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder='Title'
        name='title'
        required
      />

      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder='Provide a description'
        name='description'
        required
      />

      <input
        type='number'
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        placeholder='Price'
        name='price'
        required
      />

      <input
        type='number'
        onChange={(e) => setGuest(e.target.value)}
        value={guest}
        placeholder='Guest'
        name='guest'
        required
      />

      <input
        type='number'
        onChange={(e) => setBedroom(e.target.value)}
        value={bedroom}
        placeholder='Bedroom'
        name='bedroom'
        required
      />

      <input
        type='number'
        onChange={(e) => setBathroom(e.target.value)}
        value={bathroom}
        placeholder='Bathroom'
        name='bathroom'
        required
      />

      <input
        type='text'
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        placeholder='Address'
        name='address'
        required
      />

      <input
        type='text'
        onChange={(e) => setCity(e.target.value)}
        value={city}
        placeholder='City'
        name='city'
        required
      />

      <input
        type='text'
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder='State'
        name='state'
        required
      />

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
