import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import './SplashPage.css'


const SplashPage = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push('/listings')
  }

  // const images = [
  //   "../../../../static/carnaval.jpg",
  //   "../../../../static/morrodesp.jpg",
  //   "../../../../static/iguacu.jpg"
  // ]


  // const [index, setIndex] = useState(0);
  // const changeImage = images[index];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (index === 2) setIndex(0);
  //     else setIndex(index + 1);

  //   }, 4000);

  //   return () => clearInterval(interval);

  // }, [index]);


  return (
    <div>
      <div className='main-home-div'>
        <img className="image-home" src="../../../../static/morrodesp.jpg" alt="Brasil Image" />
        {/* <img name="imageHome" className="image-home" src={changeImage} alt="Brasil image" /> */}
        <div className='rectangle-text'></div>
        <div className='home-header'>
          <span className='home-text'>Let your curiosity do the booking</span>
          <button className="discover-button" onClick={handleRedirect}>Discover Brazil</button>
        </div>
      </div>
    </div>
  )
}


export default SplashPage;
