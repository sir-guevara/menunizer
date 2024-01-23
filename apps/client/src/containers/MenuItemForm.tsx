/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useRef, useState } from "react"
import AuthContext from "../context/AuthContext";
import { addCategory, addMenuItem, updateMenuItem } from "../api";
import { toast } from "react-toastify";
import { Button, Form, Overlay, Popover, Spinner } from "react-bootstrap";
import { RiPlayListAddFill} from "react-icons/ri";
import ImageDropzone from "./ImageDropzone";
import { AuthContextType, ItemType, PlaceType } from "../types";

const MenuItemForm = ({ place, onDone, item}:{place:PlaceType,onDone:()=>void,item?:ItemType}) =>{

    const [categoryFormShow, setCategoryFormShow]= useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const [category, setCategory] = useState(item?.categoryId||"");
    const [name, setName] = useState(item?.name);
    const [price, setPrice] = useState(item?.price || 0);
    const [description, setDescription] = useState(item?.description);
    const [image, setImage] = useState(item?.image);
    const [isAvailable, setIsAvailable] = useState(
      item?.isAvailable === undefined ? true : !!item?.isAvailable
    );

    const target = useRef(null);
    const auth = useContext(AuthContext) as AuthContextType;

    const onAddCategory = async () => {
        const json:any  = await addCategory({data:{name: categoryName},id:place.id, token:auth.token});
        if(json){
            toast(`Category ${categoryName} was created`,{type:'success'})
            setCategory(json.id);
            setCategoryFormShow(false);
            onDone();
        }
    }
    const onAddMenuItem = async () => {
        setLoading(true);

        const json = await addMenuItem({data:{name, image, description, price: parseFloat(`${price}`),isAvailable,categoryId: category},token:auth.token, placeId: place.id});
        if(json){
            toast(`Item ${name} created`,{type:'success'})
            setCategory("");
            setDescription("");
            setName("");
            setImage("");
            setPrice(0);
            setIsAvailable(true);
            onDone();
        }
        setLoading(false);

    }
    const onUpdateMenuItem = async () => {
        const json:any = await updateMenuItem({
            
            id:item!.id,
          data: {
            categoryId:category,
            name,
            price: parseFloat(`${price}`),
            description,
            image,
            isAvailable,
          },
          token:  auth.token
        }, place.id);
    
        if (json) {
    
          toast(`Menu Item ${json.name} was updated`, { type: "success" });
          setCategory("");
          setName("");
          setPrice(0);
          setDescription("");
          setImage("");
          setIsAvailable(false);
          onDone();
        }
      };
    
    return (
        <div>
            {/* CATEGORY FORM */}
            <Form.Group>
                 <Form.Label>Category</Form.Label> 
                 <div className="d-flex align-items-center">
                    <Form.Control as="select" value={category} onChange={(e)=>setCategory(e.target.value)}>
                       {category?null: <option> Select category</option>}
                        {place?.categories?.map((c)=>(
                            <option key={c.id} value={c.id} >{c.name}</option>
                        ))}
                    </Form.Control>
                    <Button ref={target} onClick={()=> setCategoryFormShow(true)} variant="link">
                        <RiPlayListAddFill size={25} />
                    </Button>
                    <Overlay 
                    show={categoryFormShow} 
                    target={target.current} 
                    placement="bottom" 
                    rootClose 
                    onHide={()=>setCategoryFormShow(false)}>
                        <Popover id="popover-contained">
                            <Popover.Title as="h3">Add Category</Popover.Title>
                            <Popover.Content>
                                <Form.Group>
                                    <Form.Control 
                                    type="text" 
                                    value={categoryName} 
                                    placeholder="Category name"
                                    onChange={(e)=>setCategoryName(e.target.value)}/>
                                </Form.Group>
                                <Button variant="standard" block  onClick={onAddCategory}>Add Category</Button>
                            </Popover.Content>
                        </Popover>
                    </Overlay>
                </div>
            </Form.Group>

            {/* MENU FORM */}
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Item name" value={name} onChange={(e)=>setName(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={description} placeholder="Enter description" onChange={(e)=>setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" value={price} onChange={(e)=>setPrice(e.target.value)}  />
            </Form.Group>
            <Form.Group>
                <Form.Label>Image</Form.Label>
                <ImageDropzone value={image}  onChange={setImage} />
            </Form.Group>

            <Form.Group>
                <Form.Check type="checkbox" checked={ isAvailable } onChange={(e)=>setIsAvailable(e.target.checked)}  label="Is Available"/>
            </Form.Group>
            <Button variant="standard" block onClick={item?.id ? onUpdateMenuItem : onAddMenuItem}disabled={loading}>
                                    {
                                    loading?
                                        <Spinner animation="border" role="status" variant="standard" as="span" size="sm" aria-hidden="true" />
                                    :(item?.id ? "Update Menu Item" : "+ Add Menu Item")
                                    }</Button>
        </div>
    )

}

export default MenuItemForm;