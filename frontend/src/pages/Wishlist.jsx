import { useEffect, useState } from "react"
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import InstagramSection from "../components/InstagramSection"
import PageHeader from "../components/PageHeader"

const BASE_URL = "http://localhost:5000/uploads/"

const Wishlist = () => {

const [wishlist,setWishlist] = useState([])

useEffect(()=>{
const stored = JSON.parse(localStorage.getItem("wishlist")) || []
setWishlist(stored)
},[])

const removeItem = (id) => {

const updated = wishlist.filter(item => item.id !== id)

setWishlist(updated)

localStorage.setItem("wishlist",JSON.stringify(updated))

}

const addToCart = (product) => {

let cart = JSON.parse(localStorage.getItem("cart")) || []

const exist = cart.find(item => item.id === product.id)

if(exist){
exist.qty += 1
}else{
cart.push({...product,qty:1})
}

localStorage.setItem("cart",JSON.stringify(cart))

alert("Added To Cart")

}

return(

<>

<PageHeader title="Wishlist" breadcrumb="Wishlist" />


<section style={{padding:"60px 0"}}>

<Container>

<h3 className="mb-4">My Wishlist</h3>

<Table bordered>

<thead>

<tr>
<th>Product</th>
<th>Name</th>
<th>Price</th>
<th>Add To Cart</th>
<th>Remove</th>
</tr>

</thead>

<tbody>

{wishlist.length === 0 && (
<tr>
<td colSpan="5" className="text-center">
Wishlist is empty
</td>
</tr>
)}

{wishlist.map(item =>(

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

<Button
variant="primary"
size="sm"
onClick={()=>addToCart(item)}
>
Add To Cart
</Button>

</td>

<td>

<Button
variant="danger"
size="sm"
onClick={()=>removeItem(item.id)}
>
Remove
</Button>

</td>

</tr>

))}

</tbody>

</Table>

</Container>

</section>

<InstagramSection/>


</>

)

}

export default Wishlist