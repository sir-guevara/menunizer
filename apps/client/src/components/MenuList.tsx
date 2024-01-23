import styled from 'styled-components';
import MenuItem from './MenuItem';
import { PlaceType } from '../types';

interface FontInterface{
    font:string
}

const Place = styled.div`
  text-align: center;
  img {
    border-radius: 5px;
    margin-bottom: 20px;
  }
`;

const Container = styled.div<FontInterface>`
  b, p {
    ${({ font }) => font && `font-family: ${font};` }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuList = ({ place, shoppingCart = {}, onOrder, font,color }:{place:PlaceType,shoppingCart?:any,onOrder:(item:any)=>void,font?:string,color?:string}) => {
  if(place?.categories?.length == 0){ 
    return <h4 className='text-center text-gray'>Please Add Menu Categories <br/> and menu items</h4>}
  return (
    <Container font={font!}>
      <Place>
        <img src={place?.image} width={100} height={100} alt={place?.name}/>
        <h3 style={{color:color}}><b>{place?.name}</b> </h3>
      </Place>
      {place?.categories
        ?.filter(
          (category) => category?.items.filter((i) => i?.isAvailable)?.length
        )
        .map((category) => (
          <div key={category?.id} className="mt-5">
            <h4 className="mb-4" style={{color}}>
              <b>{category?.name}</b>
            </h4>
            {category?.items
              .filter((item) => item.isAvailable)
              .map((item) => (
                <MenuItem 
                  key={item.id} 
                  item={{  
                    ...item,
                    quantity: shoppingCart[item.id!]?.quantity,
                  }} 
                  onOrder={onOrder}
                  color={color}
                />
              ))
            }
          </div>
        ))
      }
    </Container>
  )
};

export default MenuList;