import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { Container,Row,Col,Button,Card } from "react-bootstrap"
import API from "../services/api"
import InstagramSection from "../components/InstagramSection"
import PageHeader from "../components/PageHeader"

const BASE_URL = "http://localhost:5000/uploads/"

const ProductDetails = () => {

const { id } = useParams()

const [product,setProduct] = useState(null)
const [related,setRelated] = useState([])

useEffect(()=>{
fetchProduct()
},[])

const fetchProduct = async () => {

const res = await API.get(`/products/${id}`)
setProduct(res.data)

const all = await API.get("/products")

const relatedProducts = all.data.filter(p => p.CategoryId === res.data.CategoryId && p.id !== res.data.id)

setRelated(relatedProducts.slice(0,4))

}

const addToCart = () => {

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

const addToWishlist = () => {

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

const exist = wishlist.find(item => item.id === product.id)

if(!exist){
wishlist.push(product)
}

localStorage.setItem("wishlist",JSON.stringify(wishlist))

alert("Added To Wishlist")

}

const buyNow = () => {
addToCart()
window.location.href = "/cart"
}

if(!product) return null

return(
<>
<section style={{padding:"60px 0"}}>

<Container>

<Row>

<Col md={6}>

<img
src={BASE_URL + product.image}
style={{width:"100%"}}
/>

</Col>

<Col md={6}>

<h3>{product.title}</h3>

<h4 style={{color:"red"}}>${product.price}</h4>

<p>{product.description}</p>

<div style={{marginTop:"20px"}}>

<Button variant="primary" onClick={addToCart} style={{marginRight:"10px"}}>
Add To Cart
</Button>

<Button variant="outline-danger" onClick={addToWishlist} style={{marginRight:"10px"}}>
Wishlist
</Button>

<Button variant="success" onClick={buyNow}>
Buy Now
</Button>

</div>

</Col>

</Row>

<Row className="mt-5">

<h4>Related Products</h4>

{related.map(p =>(

<Col md={3} key={p.id}>

<Card>

<Card.Img src={BASE_URL + p.image}/>

<Card.Body>

<Card.Title style={{fontSize:"14px"}}>
{p.title}
</Card.Title>

<p>${p.price}</p>

</Card.Body>

</Card>

</Col>

))}

</Row>

</Container>


</section>

<InstagramSection/>


</>
)

}

export default ProductDetails