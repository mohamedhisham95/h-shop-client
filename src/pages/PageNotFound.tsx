// Components
import ContainerCenter from "components/layout/ContainerCenter";

// Logo
import image from "assets/404.png";

const PageNotFound = () => {
  return (
    <ContainerCenter>
      <div className="d-flex flex-column align-items-center">
        <img className="mb-4" src={image} alt="" width="200" height="200" />
        <h5>Page Not Found</h5>
      </div>
    </ContainerCenter>
  );
};

export default PageNotFound;
