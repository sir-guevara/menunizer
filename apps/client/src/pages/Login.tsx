import MainLayout from "../layouts/MainLayout"
import {Button,Form,Row,Col, Card} from 'react-bootstrap'
import { useState } from "react"
import { signIn } from "../api"
import { toast } from "react-toastify"
const Login  = () =>{
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const onClick = async () =>{
        const json =  signIn({username:username,password:password});
        if (json){
            // toast('Login successful',{type: 'success'})
            console.log("JASONNN:  : ", json)
        }
        
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
                                        value={username} onChange={(e)=>setUsername(e.target.value)} />
                                   
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                                </Form.Group>
                                <Button variant="standard"  block onClick={onClick}>
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </MainLayout>
    )
}



export default Login