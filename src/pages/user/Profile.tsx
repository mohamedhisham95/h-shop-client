import { Container, Row, Col } from "react-bootstrap";

// Components
import BreadCrumbs from "components/common/BreadCrumbs";
import ProfileDetail from "components/user/ProfileDetail";
import ChangePassword from "components/user/ChangePassword";

// Utils
import { profilePage } from "static-data/breadcrumbs-data";

const Profile = () => {
  return (
    <Container>
      <BreadCrumbs list={profilePage} />

      <Row>
        <Col md={6} className="mb-2">
          <ProfileDetail />
        </Col>

        <Col md={6} className="mb-2">
          <ChangePassword />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
