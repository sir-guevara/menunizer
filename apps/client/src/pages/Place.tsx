/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineDelete, AiOutlineQrcode } from "react-icons/ai";
import { RiFileList3Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import {
  fetchPlace,
  removePlace,
  removeCategory,
  removeMenuItem,
  updatePlace,
} from "../api";
import AuthContext from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import MenuItemForm from "../containers/MenuItemForm";
import MenuItem from "../components/MenuItem";
import QRCodeModal from "../components/QRCodeModal";
import { toast } from "react-toastify";
import { AuthContextType, PlaceType } from "../types";

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
`;

const Place = () => {
  const [place, setPlace] = useState<PlaceType>();
  const [menuItemFormShow, setMenuItemFormShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [qrCode, setQrCode] = useState(false);

  const showModal = () => setMenuItemFormShow(true);
  const hideModal = () => setMenuItemFormShow(false);

  const showQRModal = () => setQrCode(true);
  const hideQRModal = () => setQrCode(false);

  const auth = useContext(AuthContext) as AuthContextType;
  const params = useParams();
  const navigate = useNavigate();

  const onBack = () => navigate("/places");

  const onFetchPlace = async () => {
    const json:any = await fetchPlace({ id: params.id, token: auth.token });
    if (json) {
      setPlace(json);
    }
  };

  const onRemovePlace = () => {
    const c = window.confirm("Are you sure?");
    if (c) {
      removePlace({ id: params.id, token: auth.token }).then(onBack);
    }
  };

  const onRemoveCategory = async (id: string) => {
    const c = window.confirm("Are you sure?");
    const placeId = place!.id;
    if (c) {
      
    await removeCategory({id, token:auth.token},placeId).then(onFetchPlace);
    toast("Category removed successfully",{type: "info"})
      
    }
  };

  const onRemoveMenuItem = (id: string) => {
    const c = window.confirm("Are you sure?");
    if (c) {
      removeMenuItem({id, token:auth.token}, place!.id).then(onFetchPlace);
      toast("Item removed successfully",{type: "info"})
    }
  };

  const onUpdatePlace = (tables: number):void => {
    updatePlace({id:place!.id, data:{ numberOfTables: tables }, token:auth.token}).then(
      (json:any) => {
        if (json) {
          setPlace(json);
          toast("Place updated successfully",{type: "success"})
        }
      }
    );
  };

  useEffect(() => {
    onFetchPlace();
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col lg={12}>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button variant="link" onClick={onBack}>
                <IoMdArrowBack size={25} color="black" />
              </Button>
              <h3 className="mb-0 ml-2 mr-2">{place?.name}</h3>

              <Button variant="link" onClick={onRemovePlace}>
                <AiOutlineDelete size={25} color="red" />
              </Button>
            </div>

            <Button variant="link" onClick={showQRModal}>
              <AiOutlineQrcode size={25} />{" "}
              Tables
            </Button>
            |
            <Button variant="link" href={`/places/${params!.id}/orders`}>
              <RiFileList3Line size={25} />{" "}
              Orders
            </Button>
            |
            <Button variant="link" href={`/places/${params.id}/settings`}>
              <FiSettings size={25} />{" "}
              Settings
            </Button>
          </div>
        </Col>

        <Col md={4}>
          <Panel>
            <MenuItemForm place={place} onDone={onFetchPlace} />
          </Panel>
        </Col>

        <Col md={8}>
          {place?.categories?.map((category) => (
            <div key={category.id} className="mb-5">
              <div className="d-flex align-items-center mb-4">
                <h4 className="mb-0 mr-2 text-dark">
                  <b>{category.name}</b>
                </h4>
                <Button
                  variant="link"
                  onClick={() => onRemoveCategory(category.id)}
                >
                  <AiOutlineDelete size={25} color="red" />
                </Button>
              </div>
              {category.items.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    setSelectedItem(item);
                    showModal();
                  } }
                  onRemove={() => onRemoveMenuItem(item.id)}/>
              ))}
            </div>
          ))}
        </Col>
      </Row>

      <Modal show={menuItemFormShow} onHide={hideModal} centered>
        <Modal.Body>
          <h4 className="text-center">Menu Item</h4>
          <MenuItemForm
            place={place}
            onDone={() => {
              onFetchPlace();
              hideModal();
            }}
            item={selectedItem}
          />
        </Modal.Body>
      </Modal>

      <QRCodeModal
        show={qrCode}
        onHide={hideQRModal}
        place={place}
        onUpdatePlace={onUpdatePlace}
      />
    </MainLayout>
  );
};

export default Place;
