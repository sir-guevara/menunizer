import { Navbar,Nav,Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const MainLayout =  ({ children }) => {
    const history = useHistory()
    const onSingIn = () =>{
        history.replace('/login')
    }
    return (
    <>
        <Navbar bg='light' variant='light' className='mb-4'>
            <Navbar.Brand href='/'>Menunizer</Navbar.Brand>
            <Nav className='flex-grow-1  justify-content-end'>
                <Nav.Link onClick={onSingIn}>Login</Nav.Link>
            </Nav>
        </Navbar>
        <Container>
            { children }
        </Container>
    </>
    )
}


export default MainLayout