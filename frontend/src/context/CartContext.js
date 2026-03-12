import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {

const [cart,setCart] = useState([])

useEffect(()=>{

const storedCart = JSON.parse(localStorage.getItem("cart")) || []
setCart(storedCart)

},[])

const addToCart = (product)=>{

let updatedCart = [...cart]

const exist = updatedCart.find(item => item.id === product.id)

if(exist){
exist.qty += 1
}else{
updatedCart.push({...product, qty:1})
}

setCart(updatedCart)
localStorage.setItem("cart",JSON.stringify(updatedCart))

}

const removeFromCart = (id)=>{

const updatedCart = cart.filter(item => item.id !== id)

setCart(updatedCart)
localStorage.setItem("cart",JSON.stringify(updatedCart))

}

const cartCount = cart.reduce((acc,item)=> acc + item.qty ,0)

const cartTotal = cart.reduce((acc,item)=> acc + item.price * item.qty ,0)

return(

<CartContext.Provider value={{
cart,
setCart,
addToCart,
removeFromCart,
cartCount,
cartTotal
}}>

{children}

</CartContext.Provider>

)

}

export const useCart = ()=> useContext(CartContext)
