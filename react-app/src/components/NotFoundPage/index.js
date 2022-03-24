import { Link } from "react-router-dom";
import './NotFoundPage.css'

const NotFoundPage = () => {

  return (
    <div className="not-found-page">
      <div className="error-page-text-container">
        <h1 className="error-page-header">Sorry, this page could not be found</h1>
        <Link to="/listings" className="return-link">
          Return to all available listings
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage;
