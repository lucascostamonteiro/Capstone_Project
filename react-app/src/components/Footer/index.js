import './Footer.css';

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="footer-div">
        <div className='text-footer'>Developed by: Lucas Monteiro</div>
        <div className='text-footer'> <strong>Getaway 2022 ©</strong> The best place for rental listings in Brazil</div>
        <div id='links'>
          <a
            href='https://github.com/lucascostamonteiro'
            target='_blank'
            rel='noreferrer'
          >
            <i className='fab fa-github'></i>
          </a>
          <a
            href='https://www.linkedin.com/in/lucascostamonteiro/'
            target='_blank'
            rel='noreferrer'
          >
            <i className='fab fa-linkedin'></i>
          </a>
        </div>
      </div>
    </div >
  )
};

export default Footer;
