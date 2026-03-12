import { useEffect, useState } from "react"
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import PageHeader from "../components/PageHeader"

const Checkout = () => {

const navigate = useNavigate()

const [cart,setCart] = useState([])
const [payment,setPayment] = useState("bank")

const user = JSON.parse(localStorage.getItem("user"))

const [form,setForm] = useState({
firstName:"",
lastName:"",
country:"",
company:"",
address:"",
city:"",
state:"",
zip:"",
email:user?.email || "",
phone:"",
notes:""
})

useEffect(()=>{

const currentUser = JSON.parse(localStorage.getItem("user"))

if(!currentUser){
navigate("/account")
return
}

const storedCart = JSON.parse(localStorage.getItem("cart")) || []

if(storedCart.length === 0){
navigate("/cart")
return
}

setCart(storedCart)

},[navigate])

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const subtotal = cart.reduce((acc,item)=> acc + item.price * item.qty ,0)

const shipping = 5

const total = subtotal + shipping

const placeOrder = ()=>{

if(!form.firstName || !form.lastName || !form.address || !form.phone){
alert("Please fill required fields")
return
}

const order = {
userId:user.id,
userEmail:user.email,
customer:form,
items:cart,
subtotal,
shipping,
total,
payment,
date:new Date()
}

let orders = JSON.parse(localStorage.getItem("orders")) || []

orders.push(order)

localStorage.setItem("orders", JSON.stringify(orders))

alert("Order Placed Successfully")

localStorage.removeItem("cart")

navigate("/profile")

}


return(
<>

<PageHeader title="CheckOut" breadcrumb="CheckOut" />

<section style={{padding:"60px 0"}}>

<Container>

<Row>

<Col md={7}>

<h4 className="mb-4">Billing Details</h4>

<Form>

<Row>

<Col md={6}>
<Form.Group className="mb-3">
<Form.Label>First Name</Form.Label>
<Form.Control name="firstName" value={form.firstName} onChange={handleChange}/>
</Form.Group>
</Col>

<Col md={6}>
<Form.Group className="mb-3">
<Form.Label>Last Name</Form.Label>
<Form.Control name="lastName" value={form.lastName} onChange={handleChange}/>
</Form.Group>
</Col>

</Row>

<Form.Group className="mb-3">
<Form.Label>Country</Form.Label>
<Form.Control name="country" value={form.country} onChange={handleChange}/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Company Name</Form.Label>
<Form.Control name="company" value={form.company} onChange={handleChange}/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Address</Form.Label>
<Form.Control name="address" value={form.address} onChange={handleChange}/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Town / City</Form.Label>
<Form.Control name="city" value={form.city} onChange={handleChange}/>
</Form.Group>

<Row>

<Col md={6}>
<Form.Group className="mb-3">
<Form.Label>State / County</Form.Label>
<Form.Control name="state" value={form.state} onChange={handleChange}/>
</Form.Group>
</Col>

<Col md={6}>
<Form.Group className="mb-3">
<Form.Label>Postcode / Zip</Form.Label>
<Form.Control name="zip" value={form.zip} onChange={handleChange}/>
</Form.Group>
</Col>

</Row>

<Row>

<Col md={6}>
<Form.Group className="mb-3">
<Form.Label>Email</Form.Label>
<Form.Control name="email" value={form.email} onChange={handleChange}/>
</Form.Group>
</Col>

<Col md={6}>
<Form.Group className="mb-3">
<Form.Label>Phone</Form.Label>
<Form.Control name="phone" value={form.phone} onChange={handleChange}/>
</Form.Group>
</Col>

</Row>

<Form.Group className="mb-3">
<Form.Label>Order Notes</Form.Label>
<Form.Control as="textarea" rows={4} name="notes" value={form.notes} onChange={handleChange}/>
</Form.Group>

</Form>

</Col>

<Col md={5}>

<h4 className="mb-4">Your Order Summary</h4>

<Table bordered>

<thead>
<tr>
<th>Product</th>
<th>Total</th>
</tr>
</thead>

<tbody>

{cart.map(item =>(

<tr key={item.id}>
<td>{item.title} × {item.qty}</td>
<td>${item.price * item.qty}</td>
</tr>
))}

<tr>
<td>Cart Subtotal</td>
<td>${subtotal}</td>
</tr>

<tr>
<td>Shipping</td>
<td>${shipping}</td>
</tr>

<tr>
<td><strong>Order Total</strong></td>
<td><strong>${total}</strong></td>
</tr>

</tbody>

</Table>

<Form>

<Form.Check
type="radio"
label="Direct Bank Transfer"
checked={payment==="bank"}
onChange={()=>setPayment("bank")}
/>

<Form.Check
type="radio"
label="PayPal"
checked={payment==="paypal"}
onChange={()=>setPayment("paypal")}
/>

<Form.Check
type="radio"
label="Cash On Delivery"
checked={payment==="cod"}
onChange={()=>setPayment("cod")}
/>

<Button
className="mt-3 w-100"
variant="primary"
onClick={placeOrder}

>

Place Order </Button>

</Form>

</Col>

</Row>

</Container>

</section>


</>

)

}

export default Checkout
