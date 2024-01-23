/* eslint-disable @typescript-eslint/no-explicit-any */

type Login ={
    username: string;
    password: string;
}
type Token = strings
type Data= {any} 
type Id = string 

type DataToken = Data & Token 

type IdToken = Id & Token

type IdDataToken = Id & DataToken


type ItemType =
    {category?:string,name:string,price:string,image:string,isAvailable:boolean, description:string,
        quantity?:number, id?:string,categoryId?:string, id?:string
    }
type AuthContextType={
        token:string,
        loading:boolean,
        signIn: (params: any, callback: () => void) => void,
        signOut:()=>void,
        register:(params: any, callback: () => void) => void,
}

type PlaceType= {
    id:             string;
    name:           string;
    ownerId:        string;
    image:          string;
    numberOfTables: number;
    createdAt:      Date;
    updatedAt:      Date;
    font?: string;
    color?: string;
    categories:     CategoryType[];
}

type CategoryType ={
    id:      string;
    name:    string;
    placeId: string;
    items:   ItemType[];}

type ShoppingCartType = {
      [key: string]: ShoppingCartValue 
    }
    
type ShoppingCartValueType ={
        id:          string;
        name:        string;
        image:       string;
        price:       number;
        categoryId:  string;
        description: string;
        isAvailable: boolean;
        quantity:    number;
    }
    

type OrderType  = {
        id:            number;
        placeId:       string;
        table:         number;
        detail:        string;
        paymentIntent: string;
        amount:        number;
        status:        string;
        createdAt:     Date;
        updatedAt:     Date;
    }

    
export type { Login, DataToken, IdDataToken, Token, Data, IdToken,ItemType,AuthContextType,CategoryType,PlaceType,ShoppingCartType, ShoppingCartValueType, OrderType } 