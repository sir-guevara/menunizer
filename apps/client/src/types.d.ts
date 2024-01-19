
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
        signIn:()=>void,
        signOut:()=>void,
        register:()=>void
}

type PlaceType= {
    id:             string;
    name:           string;
    ownerId:        string;
    image:          string;
    numberOfTables: number;
    createdAt:      Date;
    updatedAt:      Date;
    categories:     CategoryType[];
}

type CategoryType ={
    id:      string;
    name:    string;
    placeId: string;
    items:   ItemType[];}

export type { Login, DataToken, IdDataToken, Token, Data, IdToken,ItemType,AuthContextType,CategoryType,PlaceType}