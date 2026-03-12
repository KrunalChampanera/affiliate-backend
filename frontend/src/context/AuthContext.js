// import { createContext, useContext, useState } from "react"

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

const [user,setUser] = useState(null)

useEffect(()=>{

const storedUser = localStorage.getItem("user")

if(storedUser){
setUser(JSON.parse(storedUser))
}

},[])

const login = (userData,token)=>{

localStorage.setItem("user",JSON.stringify(userData))
localStorage.setItem("token",token)

setUser(userData)

}

const logout = ()=>{

localStorage.removeItem("user")
localStorage.removeItem("token")

setUser(null)

}

return(

<AuthContext.Provider value={{user,setUser,login,logout}}>

{children}

</AuthContext.Provider>

)

}

export const useAuth = ()=> useContext(AuthContext)
