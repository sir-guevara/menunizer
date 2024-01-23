import { AiOutlineLink } from "react-icons/ai";
import { Button } from "react-bootstrap";
import {QRCodeSVG}  from "qrcode.react";
import { useRef } from "react";
import styled from "styled-components";
import { useReactToPrint } from "react-to-print";

const Container = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  > div {
    margin: auto;
  }
`;

const ComponentToPrint = styled.div`
  text-align: center;
  margin-top: 200px;
  h1 {
    font-size: 100px;
    font-weight: bold;
    margin-bottom: 50px;
  }
  h2 {
    font-size: 60px;
    margin-bottom: 100px;
  }
`;

const QRCode = ({ table, place }) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const url = `${window.location.origin}/menu/${place.id}/${table}`;

  return (
    <Container>
      <QRCodeSVG
            value={url}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
            imageSettings={{
              src: `${place.image}`,
              x: undefined,
              y: undefined,
              height: 54,
              width: 54,
              excavate: true,
            }}
          />
      <Overlay>
        <div className="d-flex">
          <Button variant="primary" onClick={handlePrint} className="m-2">
            {`Print Table ${table}`}
          </Button>
          <Button
            variant="primary"
            href={`/menu/${place.id}/${table}`}
            target="_blank"
            className="m-2"
          >
            <AiOutlineLink size={25} />
          </Button>
        </div>
      </Overlay>

      <div style={{ display: "none" }}>
        <ComponentToPrint
          ref={componentRef}
          style={{
            background: "#fff",
            backgroundRepeat: "no-repeat",
            position: "fixed",
            fontFamily:`${place.font}`,
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
        >
          <h1>Table {table}</h1>
          <h2 style={{
            color:`${place.color}`
          }}>Scan for menu</h2>
          <QRCodeSVG
            value={url}
            size={500}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={true}
            imageSettings={{
              src: `${place.image}`,
              x: undefined,
              y: undefined,
              height: 104,
              width: 104,
              excavate: true,
            }}
          />
        </ComponentToPrint>
      </div>
    </Container>
  );
};

export default QRCode;