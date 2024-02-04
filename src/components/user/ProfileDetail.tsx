import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const ProfileDetail = () => {
  // Redux
  const { user_detail } = useSelector((state: any) => state.user);

  return (
    <Card className="my-3 rounded">
      <Card.Header as="h5">Profile</Card.Header>
      <Card.Body>
        <Card.Title>Name:</Card.Title>
        <Card.Text>{user_detail.name}</Card.Text>

        <Card.Title>Email: </Card.Title>
        <Card.Text>{user_detail.email}</Card.Text>

        <Card.Title>Account Created On:</Card.Title>
        <Card.Text>
          {dayjs(user_detail.createdAt).format("dddd, MMM DD YYYY")}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileDetail;
