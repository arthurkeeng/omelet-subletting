
import { createContext , useContext , useState , useEffect } from "react";

import { getCurrentUser } from "./getCurrentUser";

const AuthContext = createContext()
export const AuthProvider = ({children}) =>{
    const [isAuthenticated , setIsAuthenticated] = useState(false)
    const [user , setUser] = useState(false)
    useEffect(()=>{

        const checkAuth = async ()=>{

            const authUser = await getCurrentUser()
            if(authUser){
                setIsAuthenticated(true)
                setUser(authUser)
            }
        }

        checkAuth()
    },[isAuthenticated])

    return (
        <AuthContext.Provider value={{
            isAuthenticated , setIsAuthenticated , user , setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthentication = ()=> {
    const context =  useContext(AuthContext)
    if(!context) throw new Error("Authentication Error")
    return context
}