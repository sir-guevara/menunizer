import { createContext, useState } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState("");
    const value = {
        token
    };
    
    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;