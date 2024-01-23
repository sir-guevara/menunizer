/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import styled from 'styled-components'
import AuthContext from "../context/AuthContext";
import { fetchPlaces } from "../api";
import { Col, Modal, Row } from "react-bootstrap";
import PlaceForm from "../containers/PlaceForm";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../types";





    const Place = styled.div`
    margin-bottom:20px;
    cursor:pointer;
    transiton:all 0.2s;
    :hover{
        transform:scale(1.05);
    }
    > div {
        background-size:cover;
        background-position:center;
        height: 200px;
        border-radius: 5px;
    }
    >p{
        margin-top:5px;
        font-size:20px;
        font-weight:bold;
    }`;


const AddPlaceButton = styled.div`
    border:2px dashed lightgrey;
    height:200px;
    border-radius:5px;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    background:white;
    :hover{
       background-color:#fbfbfbf;
    }

`

const Places = () => {
    const [places, setPlaces] = useState([]);
    const [show, setShow] = useState(false)
    const navigate = useNavigate();


    const auth = useContext(AuthContext) as AuthContextType;

    const onHide = () => setShow(false);
    const onShow = () => setShow(true);

    useEffect(() => {
       onFetchPlaces() 
    },[])

    const onFetchPlaces = async () => {
        const json:any = await fetchPlaces(auth.token);
        if(json){
            setPlaces(json)

        }
    }

    const goToPlace = (id:string) => navigate(`/places/${id}/`);

    const onDone =()=>{
        onFetchPlaces();
        onHide();
    }
    return(
    <MainLayout>
        <h3 className="text-primary m-4 text-center">My Places</h3>
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body>
                <PlaceForm  onDone={onDone}/>
            </Modal.Body>
        </Modal>
        <Row>
            {
            places.map((place: any) => (
                <Col key={place.id} lg={4}>
                    <Place onClick={()=>goToPlace(place.id)}>
                        <div style={{backgroundImage:`url(${place.image})`}}></div>
                        <p>{place.name}</p>
                    </Place>
                </Col>
            ))
        }
        <Col lg={4} >
            <AddPlaceButton onClick={onShow}> Add new place</AddPlaceButton>
        </Col>
        </Row>
    </MainLayout>)
}

export default Places;