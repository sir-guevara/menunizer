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



export type { Login, DataToken, IdDataToken, Token, Data, IdToken };