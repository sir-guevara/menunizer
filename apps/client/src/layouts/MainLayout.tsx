import { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";


const MainLayout = function ({ children }){
  const navigateTo = useNavigate();
  const auth= useContext(AuthContext);

  const onSignIn = () => {
    navigateTo('/login', { replace: true });
  };
  const goToPlaces = () => {
    navigateTo('/places', { replace: true });
  };
  const goToTegister = () => {
    navigateTo('/register', { replace: true });
  };
  const onSignOut = ()=>{
    auth.signOut();
    toast('Logged out',{type:'info'})
    navigateTo('/login', { replace: true });
  }
  return (
    <>
        <Navbar bg="light" variant="light" className="mb-4">
          <Container>
            <Navbar.Brand href="/">Menunizer</Navbar.Brand>

            <Nav className="flex-grow-1  justify-content-end">
                <Nav.Link onClick={goToPlaces}>Places</Nav.Link>
            </Nav>

            <Nav className="flex-grow-1  justify-content-end" id="nav-btn">
              {
                auth.token?
                <Nav.Link onClick={onSignOut} id="logout">Sign Out</Nav.Link>
                :
                (<><Nav.Link id="register" onClick={goToTegister}>Sing Up</Nav.Link><Nav.Link id="login" onClick={onSignIn}>Sign In</Nav.Link></>)
              }
            </Nav>
            </Container>
        </Navbar>
        <Container>
            { children }
        </Container>
    </>
  );
}

export default MainLayout;