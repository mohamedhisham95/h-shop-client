import { Container, Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { BsFillSunFill, BsFillMoonFill, BsCart4 } from "react-icons/bs";

// Logo
import logo from "assets/logo.png";

// Redux
import { setTheme } from "redux/commonSlice";

const Header = () => {
  // Dispatch
  const dispatch = useDispatch();

  // Redux State
  const { theme } = useSelector((state: any) => state.common);

  // Theme Handler
  function changeTheme() {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg={theme === "dark" ? "primary" : "light"}
      variant={theme}
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
                <BsCart4
                  className="icon"
                  color={theme === "dark" ? "white" : "black"}
                />
                <Badge
                  pill
                  variant={theme === "dark" ? "light" : "primary"}
                  className="mr-4"
                >
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
            <Nav.Item className="btn-theme" onClick={() => changeTheme()}>
              {theme === "light" ? (
                <BsFillSunFill className="icon" color="black" />
              ) : (
                <BsFillMoonFill className="icon" color="white" />
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
