import { Alert } from "react-bootstrap";

type props = {
  variant?: string;
  message: any;
};

const Message: React.FC<props> = ({ variant, message }) => {
  return <Alert variant={(variant = "danger")}>{message}</Alert>;
};

export default Message;
