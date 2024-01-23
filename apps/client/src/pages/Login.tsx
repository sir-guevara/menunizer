import MainLayout from "../layouts/MainLayout"
import {Button,Form,Row,Col, Card, Spinner} from 'react-bootstrap'
import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { AuthContextType } from "../types"

const Login  = () =>{
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigateTo = useNavigate();
    const auth = useContext(AuthContext) as AuthContextType;

    useEffect(() =>{
        if(auth.token){
            navigateTo('/places', { replace: true });
        }
    })
    const demoLogin = () =>{
        auth.signIn({username:'alex@ruheni.com',password:'password-alex'},()=> navigateTo('/places'));
    }
    const onClick = () =>{
        auth.signIn({username,password},()=> navigateTo('/places'));
    }
    return (
        <MainLayout>
            <Row className="justify-content-center"> 
                <Col lg={6} md={8}>
                    <Card>
                        <Card.Header>
                                <h3 className="text-center">LOGIN</h3>
                        </Card.Header>
                        <Card.Body>
                            
                            <Form>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter email" 
                                        name="email" 
                                        value={username} onChange={(e)=>setUsername(e.target.value)} />
                                   
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                                </Form.Group>
                                <Button variant="standard" className="my-4"  block onClick={onClick} disabled={auth.loading}>
                                    {
                                    auth.loading?
                                        <Spinner animation="border" role="status" variant="standard" as="span" size="sm" aria-hidden="true" />
                                    :"Sign in"
                                    }
                                </Button>
                            </Form>
                            <div className="text-center">
                            <p className="text-gray">
                                Don't have an account?
                                <Link className="underline text-primary" to="/register">{" "}
                                Sign up
                                </Link> {"  "}
                                <Button className="btn-sm" variant="secondary" onClick={demoLogin}>Demo Login</Button>
                            </p>
                            
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </MainLayout>
    )
}



export default Login