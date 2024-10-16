import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link, useOutletContext } from "react-router-dom"
import { paths } from "../../config/paths"
import { Login } from '../LogIn/LogIn/LogIn'
import './NavBar.scss'
import { LoggedInContext } from "../../App"
import { useState } from "react"
import { SignIn } from "../SignIn/SignIn"


export const NavBar = () => {

    const {loggedIn } = useOutletContext<LoggedInContext>();
    const [showSignInModal, setSignInModalState] = useState<boolean>(false);

    const hideModal = () => {
        setSignInModalState(false)
    }

    return (
        <>
        <Navbar expand = "lg" className = "custom-navbar">
            <Container fluid>
                <Navbar.Brand as={Link} to={paths.root}>
                    Logo here
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">
                        {loggedIn.state && (
                            <Nav.Link as={Link} to={paths.game}>
                                Play
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
                <Navbar className="Toggle">
                    <Login />
                    <Button onClick={() => setSignInModalState(true)}> Sign in</Button>
                </Navbar>
            </Container>
        </Navbar>
            {showSignInModal && (
                <SignIn hideModal={hideModal}/> ) }
        </>
    )
}