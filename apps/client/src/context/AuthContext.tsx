/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import { signIn as singInApi, register as registerApi  } from "../api";

 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 // @ts-expect-error
const AuthContext = createContext();

interface SignInResponse {
    accessToken?: string; // Adjust the type according to your actual response structure
  }

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading,setLoading] = useState(false);

    const signIn = async  ({ username, password }: { username: string; password: string },
    callback=()=>"" ): Promise<void>=>{
        setLoading(true);
        const response = await singInApi({username,password}) as SignInResponse;
        if(response && response.accessToken){
            localStorage.setItem("token",response.accessToken);
            setToken(response.accessToken);
            callback()

        }
        setLoading(false);
    }

    const signOut = ()=>{
        localStorage.removeItem("token");
        setToken("");
    }

    const register = async ({username,password}: { username: string; password: string },callback)=>{
        setLoading(true);
        const response:any = await registerApi({username,password});
        if(response && response.id){
            callback()
        }
        setLoading(false);

    }



    const value = {
        token,
        loading,
        signIn,
        signOut,
        register
    };
    
    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;