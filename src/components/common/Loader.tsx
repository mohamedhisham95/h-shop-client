import { Spinner } from "react-bootstrap";

type props = {
  loaderSize?: "small" | "big";
};

const Loader: React.FC<props> = ({ loaderSize = "big" }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      variant="light"
      style={
        loaderSize === "small"
          ? {
              width: "32px",
              height: "32px",
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
