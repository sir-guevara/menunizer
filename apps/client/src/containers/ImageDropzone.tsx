/* eslint-disable react-hooks/exhaustive-deps */
import { Spinner } from "react-bootstrap";

import { useDropzone } from "react-dropzone";


import styled from "styled-components";


import { uploadImage } from "../api";
import { useCallback, useState } from "react";


const Dropzone = styled.div`
    border: 1px dashed #ccc;
    border-radius: 5px;
    color: #6c7c7c;
    display:flex;
    cursor: pointer;
    align-items:center;
    justify-content:center;
    height:142px;
    img{
        height: 140px;

    }
`;

function ImageDropzone({value,onChange}){
    const [loading, setLoading] = useState(false);
    const onDrop = useCallback((acceptedFiles: (string | Blob)[])=>{
        setLoading(true);
        uploadImage(acceptedFiles[0])
        .then((json)=>onChange(json.url))
        .finally(()=>setLoading(false))
    },[]);
    const {getRootProps, getInputProps} = useDropzone(
        {onDrop,
        multiple:false,
        accept:'image/*'});

    return (
        <Dropzone {...getRootProps()}>
            <input {...getInputProps()} />
            {
            value ? <img src={value}  alt="img"/> 
            : loading ? 
            (<Spinner animation="border" role="status" variant="standard"  />)
            : <span>Drag & drop image here, or click to select image</span>
            }
        </Dropzone>
    )
}


export default ImageDropzone;