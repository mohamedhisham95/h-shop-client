import { Link } from "react-router-dom";

// Components
import ContainerCenter from "components/layout/ContainerCenter";

// Logo
import image from "assets/404.png";

const PageNotFound = () => {
  return (
    <ContainerCenter>
      <div className="d-flex flex-column align-items-center">
        <img className="mb-4" src={image} alt="" width="200" height="200" />
        <h5>OOPS!, Page Not Found</h5>
        <Link to="/" className="mt-3">
          Click Here to return to home page
        </Link>
      </div>
    </ContainerCenter>
  );
};

export default PageNotFound;
