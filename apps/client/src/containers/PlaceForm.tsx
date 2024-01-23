import {Form, Button} from 'react-bootstrap'
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { addPlace } from '../api';
import ImageDropzone from './ImageDropzone';
import { AuthContextType } from '../types';


const PlaceForm = ({ onDone })=>{
    const [name, setName]= useState("");
    const [image, setImage]= useState("");

    const auth = useContext(AuthContext) as AuthContextType;

    const onClick = async ()=>{
        const json = await addPlace({ token:auth.token, data:{name,image}})
        if(json){
            setImage("")
            setName("")
            onDone()
        }

    }
    return (
        <div>
            <h2 className='text-center text-primary'>Place</h2>
            <Form>
                <Form.Group>
                    <Form.Label className='text-primary font-md'>Name</Form.Label>
                    <Form.Control type="text" placeholder="Restaurant name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='text-primary font-md'>Image</Form.Label>
                    <ImageDropzone value={image} onChange={setImage} />
                </Form.Group>
                <Button variant="standard" block onClick={onClick} className='my-4'>Add Place</Button>
            </Form>
        </div>
    )

}



export default PlaceForm