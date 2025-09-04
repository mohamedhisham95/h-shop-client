import { Container, Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BsCart4 } from 'react-icons/bs';
import { withRouter, useHistory } from 'react-router-dom';
import { useState } from 'react';

// Component
import SearchBox from 'components/layout/SearchBox';

// Logo
import logo from 'assets/logo.png';

// Redux
import { setLogout } from 'redux/userSlice';

const Header = () => {
  // History
  const history = useHistory();

  // Dispatch
  const dispatch = useDispatch();

  // Redux State
  const { user_detail } = useSelector((state: any) => state.user);
  const { cart_items } = useSelector((state: any) => state.cart);

  // State
  const [expanded, setExpanded] = useState<any>(false);

  // Brand Handler
  function brandHandler() {
    setExpanded(false);
    history.push('/');
  }

  // Logout Handler
  function handleLogout() {
    dispatch(setLogout());
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      fixed="top"
      className="header"
      expanded={expanded}
      onToggle={(v) => {
        setExpanded(v);
      }}
    >
      <Container>
        <Navbar.Brand
          as="div"
          className="cursor-pointer"
          onClick={brandHandler}
        >
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <SearchBox setExpanded={setExpanded} />
          </Nav>

          <Nav className="ml-auto">
            {user_detail !== null && (
              <NavDropdown id="user-dropdown" title={user_detail?.name}>
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/my-orders">
                  <NavDropdown.Item>My Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/change-password">
                  <NavDropdown.Item>Change Password</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {user_detail !== null && user_detail?.role === 'Admin' && (
              <NavDropdown id="admin-dropdown" title="Admin">
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/category/list">
                  <NavDropdown.Item>Category</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/product/list">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/order/list">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/user/list">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}

            <LinkContainer to="/cart" className="mr-4">
              <Nav.Link>
                <BsCart4 className="icon" color="white" />
                <Badge pill variant="dark">
                  {cart_items.length}
                </Badge>
              </Nav.Link>
            </LinkContainer>

            {user_detail === null && (
              <>
                <LinkContainer to="/signin" className="mr-4">
                  <Nav.Link>Signin</Nav.Link>
                </LinkContainer>
                {/* <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer> */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(Header);
