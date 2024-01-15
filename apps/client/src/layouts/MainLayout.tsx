import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const MainLayout = function ({ children }){
  const navigateTo = useNavigate();
  const onSingIn = () => {
    navigateTo('/login', { replace: true });
  };
  const goToPlaces = () => {
    navigateTo('/places', { replace: true });
  };
  
  return (
    <>
        <Navbar bg="light" variant="light" className="mb-4">
            <Navbar.Brand href="/">Menunizer</Navbar.Brand>

            <Nav className="flex-grow-1  justify-content-end">
                <Nav.Link onClick={goToPlaces}>Places</Nav.Link>
            </Nav>

            <Nav className="flex-grow-1  justify-content-end">
                <Nav.Link onClick={onSingIn}>Login</Nav.Link>
            </Nav>

        </Navbar>
        <Container>
            { children }
        </Container>
    </>
  );
}

export default MainLayout;