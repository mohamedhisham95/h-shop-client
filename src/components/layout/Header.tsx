import { Container, Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

// Logo
import logo from "assets/logo.png";

// Components
import Loader from "components/common/Loader";

// Redux
// import { setTheme } from "redux/commonSlice";

const Header = () => {
  // Dispatch
  // const dispatch = useDispatch();

  // Redux State
  // const { theme } = useSelector((state: any) => state.common);

  // Theme Handler
  // function changeTheme() {
  //   dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  // }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      fixed="top"
      className="header"
    >
      <Container>
        <LinkContainer to="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </LinkContainer>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/cart" className="mr-4">
              <Nav.Link>
                <BsCart4 className="icon" color="white" />
                <Badge pill variant="dark" className="mr-4">
                  5
                </Badge>
                Cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signin" className="mr-4">
              <Nav.Link>Signin</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup" className="mr-4">
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
