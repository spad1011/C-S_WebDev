import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { paths } from "../../config/paths"
import { LogInnn } from '../LogIn/LogIn'
import './NavBar.scss'
export const NavBar = () => {
    const isLoggedIn = true
    return (
        <Navbar expand = "lg" className = "custom-navbar">
            <Container fluid>
                <Navbar.Brand as={Link} to={paths.root}>
                    Logo here
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">
                        {isLoggedIn && (
                            <Nav.Link as={Link} to={paths.game}>
                                Play
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
                <Navbar className="Toggle">
                    <LogInnn />
                </Navbar>
            </Container>
        </Navbar>
    )
}