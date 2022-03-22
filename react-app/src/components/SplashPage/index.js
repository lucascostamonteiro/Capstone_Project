import { useHistory } from 'react-router-dom';

const SplashPage = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push('/listings')
  }

  return (
    <div>
      <div>
        <img src="https://a0.muscache.com/im/pictures/23b047cd-19c9-42c0-a83b-2f4f6f25717b.jpg?im_w=1200" alt="cabin in the woods" />
        <div>
          <span>Let your curiosity do the booking</span>
          <button onClick={handleRedirect}>Discover Brazil</button>
        </div>

      </div>
    </div>
  )
}


export default SplashPage;
