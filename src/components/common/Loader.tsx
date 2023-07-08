import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

type props = {
  loaderSize?: "small" | "big";
};

const Loader: React.FC<props> = ({ loaderSize = "big" }) => {
  // Redux State
  const { theme } = useSelector((state: any) => state.common);

  return (
    <Spinner
      animation="border"
      role="status"
      variant={theme}
      style={
        loaderSize === "small"
          ? {
              width: "40px",
              height: "40px",
              margin: "auto",
              display: "block",
            }
          : {
              width: "100px",
              height: "100px",
              margin: "auto",
              display: "block",
            }
      }
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
