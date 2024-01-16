import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPlace } from "../api";
import MainLayout from "../layouts/MainLayout";
import { Button, Col, Row } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";


const Place =() =>{
    const [place,setPlace] = useState({});

    const auth = useContext(AuthContext);
    const params = useParams();
    const navigateTo = useNavigate();
    const onBack = ()=> navigateTo("/places",{replace: true});

    const onFetchPlace = async () =>{
        const json = await fetchPlace( {id: params.id, token:auth.token});
        if(json){
            setPlace(json);
        }
    }
    useEffect(()=>{
        onFetchPlace();
    },[]);
    return (
        <MainLayout>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1 className="h3 mb-0 text-gray-800">{place.name}</h1>
                            <Button className="text-muted" variant="link" onClick={onBack}>
                                <IoMdArrowBack size={35}/>
                            </Button>
                        </div>  
                    </div>
                </Col>
            </Row>
        </MainLayout>
    )
}

export default Place;