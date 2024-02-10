import { Container, Row, Col } from "react-bootstrap";

// Components
import BreadCrumbs from "components/common/BreadCrumbs";
import ProfileDetail from "components/user/ProfileDetail";
import UpdateProfile from "components/user/UpdateProfile";

// Utils
import { profilePage } from "static-data/breadcrumbs-data";

const Profile = () => {
  return (
    <Container>
      <BreadCrumbs list={profilePage} />

      <Row>
        <Col md={6}>
          <ProfileDetail />
        </Col>

        <Col md={6}>
          <UpdateProfile />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
