import { useState,useEffect } from "react"
import { Container,Row,Col,Button,Table,Alert } from "react-bootstrap"
import InstagramSection from "../components/InstagramSection"
import PageHeader from "../components/PageHeader"

const BASE_URL = "http://localhost:5000/uploads/"

const Cart = () => {

const [cart,setCart] = useState([])
const [showLoginMsg,setShowLoginMsg] = useState(false)

useEffect(()=>{
const stored = JSON.parse(localStorage.getItem("cart")) || []
setCart(stored)
},[])

const updateQty = (id,type) => {

let updated = cart.map(item =>{

if(item.id === id){

if(type==="inc") item.qty += 1

if(type==="dec" && item.qty > 1) item.qty -= 1

}

return item

})

setCart(updated)

localStorage.setItem("cart",JSON.stringify(updated))

}

const removeItem = (id) => {

const updated = cart.filter(item => item.id !== id)

setCart(updated)

localStorage.setItem("cart",JSON.stringify(updated))

}

const subtotal = cart.reduce((acc,item)=> acc + item.price * item.qty,0)

const shipping = 30

const total = subtotal + shipping

const handleCheckout = () => {

const user = JSON.parse(localStorage.getItem("user"))

if(!user){
setShowLoginMsg(true)
}else{
window.location.href="/checkout"
}

}

return(
<> <PageHeader title="Cart" breadcrumb="Cart" />

<section style={{padding:"60px 0"}}>

<Container>

<Table>

<thead>

<tr>
<th>Product</th>
<th>Name</th>
<th>Price</th>
<th>Quantity</th>
<th>Total</th>
<th></th>
</tr>

</thead>

<tbody>

{cart.map(item =>(

<tr key={item.id}>

<td>
<img
src={BASE_URL + item.image}
width="70"
/>
</td>

<td>{item.title}</td>

<td>${item.price}</td>

<td>

<Button size="sm" onClick={()=>updateQty(item.id,"dec")}>-</Button>

<span style={{margin:"0 10px"}}>{item.qty}</span>

<Button size="sm" onClick={()=>updateQty(item.id,"inc")}>+</Button>

</td>

<td>${item.price * item.qty}</td>

<td>

<Button
variant="danger"
size="sm"
onClick={()=>removeItem(item.id)}

>

x </Button>

</td>

</tr>

))}

</tbody>

</Table>

<Row className="justify-content-end">

<Col md={4}>

<div style={{border:"1px solid #ddd",padding:"20px"}}>

<h5>Cart Totals</h5>

<p>Subtotal : ${subtotal}</p>

<p>Shipping : ${shipping}</p>

<h5>Total : ${total}</h5>

<Button
className="w-100"
onClick={handleCheckout}

>

Proceed To Checkout </Button>

{showLoginMsg && (

<Alert variant="warning" style={{marginTop:"15px"}}>

You must login or register before placing an order.

<div style={{marginTop:"10px"}}>

<Button
variant="primary"
onClick={()=>window.location.href="/account"}

>

Go To My Account </Button>

</div>

</Alert>

)}

</div>

</Col>

</Row>

</Container>

</section>

<InstagramSection/>

</>
)

}

export default Cart
