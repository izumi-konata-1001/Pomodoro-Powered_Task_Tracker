import { createContext,useContext } from "react";
import { useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({children}){
    const [token, setToken] = useState("");

    const login = (newToken) =>{
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }
    
    const logout = () =>{
        localStorage.removeItem("token");
        setToken("");
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            setToken(storedToken);
        }
    },[]);


    return(
        <AuthContext.Provider value={{token,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    return useContext(AuthContext);
}

export { AuthProvider,useAuth }