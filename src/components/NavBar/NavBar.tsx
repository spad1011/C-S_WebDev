import {
  Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import { Link, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { paths } from '../../config/paths.tsx';
import { Login } from '../UserAdministration/LogIn/LogIn.tsx';
import './NavBar.scss';
import { LoggedInContext } from '../../App.tsx';
import { SignIn } from '../UserAdministration/SignIn/SignIn.tsx';
import logo from '../../assets/rps_logo.png';

export function NavBar() {
  const { loggedIn } = useOutletContext<LoggedInContext>(); // retrieve global Variable from app.tsx
  const [showSignInModal, setSignInModalState] = useState<boolean>(false);

  const hideModal = () => {
    setSignInModalState(false);
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container fluid>
          <Navbar.Brand as={Link} to={paths.root}>
            <img
              src={logo}
              alt="logo"
              width="80"
              height="80"
              className="d-inline-block align-middle me-2"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {loggedIn.state && (
              <Nav.Link // pressing button while already on page causes error
                as={Link}
                to={paths.game}
              >
                Play
              </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar className="Toggle">
            <Login />
            <Button className="ms-3" onClick={() => setSignInModalState(true)}> Sign in</Button>
          </Navbar>
        </Container>
      </Navbar>
      {showSignInModal && (
        <SignIn hideModal={hideModal} />) }
    </>
  );
}
