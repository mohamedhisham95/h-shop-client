// Components
import ContainerCenter from "components/layout/ContainerCenter";

// Logo
import four_zero_four from "assets/404.png";

const PageNotFound = () => {
  return (
    <ContainerCenter>
      <div className="d-flex flex-column align-items-center">
        <img
          className="mb-4"
          src={four_zero_four}
          alt=""
          width="50"
          height="50"
        />
        <h5>Page Not Found</h5>
      </div>
    </ContainerCenter>
  );
};

export default PageNotFound;
