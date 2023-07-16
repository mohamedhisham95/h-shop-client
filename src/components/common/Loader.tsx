import { Spinner } from "react-bootstrap";

type props = {
  loaderSize?: "small" | "big";
  variant?: string;
};

const Loader: React.FC<props> = ({ loaderSize = "big", variant = "light" }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      variant={variant}
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
