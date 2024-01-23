/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col } from "react-bootstrap"
import styled from "styled-components"
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai"
import { ShoppingCartValueType } from "../types"

type StyledComponentProps = {
  active:boolean | string
} 
const Container = styled.div<StyledComponentProps>`
    border-radius: 5px;
    background-color: #fff;
    margin-bottom: 30px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
    display:flex;
    opacity: ${({ active }) => ( active == 'true' ? 1 : 0.6)};
    > div:first-child {
        width: 40%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-size: cover;
        background-position: center;
    }
    > div:last-child {
        padding: 15px 20px;
        min-height: 150px;

    }
`

const MenuItem = ({ item, onEdit, onRemove, onOrder, color}:{item:any, onEdit?:()=>void, onRemove?:()=>void, onOrder?:( itm:ShoppingCartValueType ) => void, color?:string}) =>{
  return (<Container active={item.isAvailable.toString()}>
    <Col xs={5} style={{ backgroundImage: `url(${item.image})`}} />
    <Col xs={7} className="d-flex flex-column justify-content-between w-100">
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="mb-0 text-black text-lg ">
            <b>{item.name}</b>
          </h4>
          <div className="w-10">
            {onEdit ? (
              <Button variant="link" onClick={onEdit}>
                <AiFillEdit size={20} />
              </Button>
            ) : null}

            {onRemove ? (
              <Button variant="link" onClick={onRemove}>
                <AiOutlineDelete size={20} color="red" />
              </Button>
            ) : null}
          </div>
        </div>
        <p className="mb-4 text-md fw-sm text-gray">{item.description}</p>
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <h5 className="mb-0 text-standard">
            <b style={{ color:color }}>${item.price}</b>
          </h5>

          {onOrder ? (
            <Button
              variant="standard"
              style={{ backgroundColor: color}}
              className="mt-2"
              size="sm"
              color="white"
              onClick={() => onOrder(item)}
            >
              {!item.quantity
                ? "Add to shopping cart"
                : `Add one more (${item.quantity})`}
            </Button>
          ) : null}
        </div>

        {!item.isAvailable ? (
          <small className="text-secondary">Not Available</small>
        ) : null}
      </div>
    </Col>
  </Container>)

}

export default MenuItem;