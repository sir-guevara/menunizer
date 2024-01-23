import MainLayout from "../layouts/MainLayout";
import { Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { AuthContextType } from "../types";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const auth = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    if (auth.token) {
      navigateTo("/places", { replace: true });
    }
  });

  const onClick = async () => {
    auth.register({ username, password }, () =>
      auth.signIn({ username, password }, () => navigateTo("/places"))
    );
  };
  return (
    <MainLayout>
      <Row className="justify-content-center min-h-80">
        <Col lg={6} md={8}>
          <Card>
            <h3 className="text-center text-primary mt-4">Sing Up</h3>
            <p className="text-gray text-center">
              Create your account to get started.
            </p>

            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label className="text-primary font-md  text-md">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-primary font-md  text-md">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="standard"
                  className="my-4"
                  block
                  onClick={onClick}
                  disabled={auth.loading}
                >
                  {auth.loading ? (
                    <Spinner
                      animation="border"
                      role="status"
                      variant="standard"
                      as="span"
                      size="sm"
                      aria-hidden="true"
                    />
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </Form>
              <div className="text-center">
                <p className="text-gray">
                  Already have an account?
                  <Link className="underline text-primary" to="/login">
                    {" "}
                    Log in
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Register;
