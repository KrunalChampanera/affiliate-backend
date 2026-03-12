import { useState,useEffect } from "react"
import { Container,Card,Button,Form,Row,Col,Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const BASE_URL = "http://localhost:5000/uploads/"

const Profile = () => {

const navigate = useNavigate()

const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
const [cart,setCart] = useState([])
const [wishlist,setWishlist] = useState([])
const [orders,setOrders] = useState([])
const [editing,setEditing] = useState(false)

const [form,setForm] = useState({
name:user?.name || "",
email:user?.email || "",
address:user?.address || ""
})

useEffect(()=>{

if(!user){
navigate("/account")
return
}

const storedCart = JSON.parse(localStorage.getItem("cart")) || []
const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || []
const storedOrders = JSON.parse(localStorage.getItem("orders")) || []

setCart(storedCart)
setWishlist(storedWishlist)
setOrders(storedOrders)

},[])

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const saveProfile = ()=>{

const updatedUser = {...user,...form}

localStorage.setItem("user",JSON.stringify(updatedUser))

setUser(updatedUser)

setEditing(false)

}

const handleLogout = ()=>{

localStorage.removeItem("token")
localStorage.removeItem("user")

navigate("/account")

}

const removeCartItem = (id)=>{

const updated = cart.filter(item => item.id !== id)

setCart(updated)

localStorage.setItem("cart",JSON.stringify(updated))

}

const removeWishlistItem = (id)=>{

const updated = wishlist.filter(item => item.id !== id)

setWishlist(updated)

localStorage.setItem("wishlist",JSON.stringify(updated))

}

if(!user){
return <h3 style={{textAlign:"center",marginTop:"50px"}}>Please login first</h3>
}

return(

<section style={{padding:"60px 0"}}>

<Container>

<Row>

<Col md={6}>

<Card style={{padding:"25px"}}>

<h4 className="mb-3">Profile Details</h4>

{editing ? (

<Form>

<Form.Group className="mb-3">
<Form.Label>Name</Form.Label>
<Form.Control name="name" value={form.name} onChange={handleChange}/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Email</Form.Label>
<Form.Control name="email" value={form.email} onChange={handleChange}/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Address</Form.Label>
<Form.Control name="address" value={form.address} onChange={handleChange}/>
</Form.Group>

<Button onClick={saveProfile}>Save</Button>

</Form>

) : (

<>

<p><strong>Name:</strong> {user.name}</p>
<p><strong>Email:</strong> {user.email}</p>
<p><strong>Address:</strong> {user.address || "Not Added"}</p>

<Button
variant="primary"
onClick={()=>setEditing(true)}

>

Edit Profile </Button>

</>

)}

<Button
variant="danger"
className="mt-3"
onClick={handleLogout}

>

Logout </Button>

</Card>

</Col>

</Row>

<h4 className="mt-5 mb-3">My Cart</h4>

<Table bordered>

<thead>
<tr>
<th>Product</th>
<th>Name</th>
<th>Price</th>
<th></th>
</tr>
</thead>

<tbody>

{cart.map(item =>(

<tr key={item.id}>

<td>
<img src={BASE_URL + item.image} width="60"/>
</td>

<td>{item.title}</td>

<td>${item.price}</td>

<td>

<Button
variant="danger"
size="sm"
onClick={()=>removeCartItem(item.id)}

>

Remove </Button>

</td>

</tr>

))}

</tbody>

</Table>

<h4 className="mt-5 mb-3">My Wishlist</h4>

<Table bordered>

<thead>
<tr>
<th>Product</th>
<th>Name</th>
<th>Price</th>
<th></th>
</tr>
</thead>

<tbody>

{wishlist.map(item =>(

<tr key={item.id}>

<td>
<img src={BASE_URL + item.image} width="60"/>
</td>

<td>{item.title}</td>

<td>${item.price}</td>

<td>

<Button
variant="danger"
size="sm"
onClick={()=>removeWishlistItem(item.id)}

>

Remove </Button>

</td>

</tr>

))}

</tbody>

</Table>

<h4 className="mt-5 mb-3">My Orders</h4>

<Table bordered>

<thead>
<tr>
<th>Order Date</th>
<th>Total</th>
<th>Payment</th>
<th>Address</th>
</tr>
</thead>

<tbody>

{orders.map((order,index)=>(

<tr key={index}>

<td>{new Date(order.date).toLocaleDateString()}</td>

<td>${order.total}</td>

<td>{order.payment}</td>

<td>{order.customer.address}</td>

</tr>

))}

</tbody>

</Table>

</Container>

</section>

)

}

export default Profile
