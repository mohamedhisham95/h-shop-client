import { ListGroup } from "react-bootstrap";

type props = {
  variant?: string;
  messageList: any;
  className?: string;
};

const MessageList: React.FC<props> = ({ variant, messageList, className }) => {
  return (
    <ListGroup variant="flush" className={className}>
      {Object.values(messageList).map((message: any, index: number) => (
        <ListGroup.Item key={index} variant={(variant = "danger")}>
          {message}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default MessageList;
