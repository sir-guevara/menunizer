/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { ChromePicker } from "react-color";
import styled from "styled-components";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import AuthContext from "../context/AuthContext";
import { AuthContextType, PlaceType } from "../types";
import { fetchPlace, updatePlace } from "../api";
import { IoMdArrowBack } from "react-icons/io";
import MenuList from "../components/MenuList";

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
`;

const MenuSettings = () => {
  const [place, setPlace] = useState<PlaceType>();
  const [font, setFont] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext) as AuthContextType;

  const onBack = () => navigate(`/places/${params.id}`);

  const onFetchPlace = async () => {
    const json = await fetchPlace({id:params.id,token:auth.token}) as PlaceType;
    if (json) {
      setPlace(json);
      console.log(json);
      setFont(json.font || "");
      setColor(json.color || "");
    }
  };

  const onUpdatePlace = async () => {
    setLoading(true);
    const json:any = await updatePlace({
      id: place!.id,
      data: { font, color },
      token: auth.token,
    });
    if (json) {
      toast("New settings is updated", { type: "success" });
      setPlace(json);
      setLoading(false);
    }
  };

  useEffect(() => {
    onFetchPlace();
  }, []);

  return (
    <MainLayout>
      <div className="d-flex align-items-center mb-4">
        <Button variant="link" onClick={onBack}>
          <IoMdArrowBack size={25} color="black" />
        </Button>
        <h3 className="mb-0 mr-2 ml-2">Menu Settings</h3>
      </div>

      <Row>
        {/* LEFT SIDE */}
        <Col md={4}>
          <Panel>
            <Form.Group>
              <Form.Label>Font</Form.Label>
              <Form.Control
                as="select"
                value={font}
                onChange={(e) => setFont(e.target.value)}
              >
                <option value="'Helvitica', sans-serif">Helvitica</option>
                 <option value="'Bitter', serif">Bitter</option>
                  <option value="'Caveat', cursive">Caveat</option>
                  <option value="'Concert One', sans-serif">Concert One</option>
                  <option value="'Cookie', cursive">Cookie</option>
                  <option value="'Indie Flower', cursive">Indie Flower</option>
                  <option value="'Josefin Slab', serif">Josefin Slab</option>
                  <option value="'Jost', sans-serif">Jost</option>
                  <option value="'Lemon', serif">Lemon</option>
                  <option value="'Lobster', sans-serif">Lobster</option>
                  <option value="'Montserrat', sans-serif">Montserrat</option>
                  <option value="'Pacifico', cursive">Pacifico</option>
                  <option value="'Philosopher', sans-serif">Philosopher</option>
                  <option value="'Righteous', sans-serif">Righteous</option>
                  <option value="'Roboto', sans-serif">Roboto</option>
                  <option value="'Roboto Condensed', sans-serif">Roboto Condensed</option>
                  <option value="'Salsa', cursive">Salsa</option>
                  <option value="'Shadows Into Light', cursive">Shadows Into Light</option>
                  <option value="'Ubuntu', sans-serif">Ubuntu</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Color</Form.Label>
              <ChromePicker
                color={color}
                onChange={(value) => setColor(value.hex)}
                disableAlpha
                              />
            </Form.Group>

            <Button
              className="mt-4"
              variant="standard"
              block
              onClick={onUpdatePlace}
              disabled={loading}
            >
              Save Setings
            </Button>
          </Panel>
        </Col>

        {/* RIGHT SIDE */}
        <Col md={8}>
          <MenuList
            place={place!}
            font={font}
            color={color}
            onOrder={() => []}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default MenuSettings;
