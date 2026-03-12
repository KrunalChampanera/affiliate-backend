import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import API from "../services/api"
import InstagramSection from "./InstagramSection"
import PageHeader from "./PageHeader"

const BASE_URL = "http://localhost:5000/uploads/"

const ReviewDetails = () => {

const { id } = useParams()

const [product,setProduct] = useState(null)
const [topProducts,setTopProducts] = useState([])

const fetchProduct = async () => {
const res = await API.get(`/products/${id}`)
setProduct(res.data)
}

const fetchTopProducts = async () => {
const res = await API.get("/products")
setTopProducts(res.data.slice(0,4))
}

useEffect(()=>{
fetchProduct()
fetchTopProducts()
},[id])

if(!product) return <h3 style={{textAlign:"center"}}>Loading...</h3>

return (
<>
 
<PageHeader title="Review Details" breadcrumb="Review Details" />

<section style={{padding:"60px 0",background:"#f7f7f7"}}>

<Container>

<Row>

{/* LEFT CONTENT */}

<Col lg={9}>

<h4 style={{fontWeight:"600"}}>{product.title}</h4>

<p style={{color:"#888"}}>
By Admin | Category: {product.category}
</p>

{/* MAIN IMAGE */}

<div style={{
width:"100%",
maxWidth:"720px",
margin:"20px 0"
}}>

<img
src={BASE_URL + product.image}
alt={product.title}
style={{
width:"100%",
height:"auto",
borderRadius:"6px"
}}
/>

</div>

<p>{product.description}</p>

{/* SPEC TABLE */}

<Card className="p-4 mb-4">

<h5>Quality Of {product.title}</h5>

<table className="table">

<tbody>

<tr>
<td>CPU</td>
<td>Qualcomm Snapdragon 835</td>
</tr>

<tr>
<td>GPU</td>
<td>Adreno 540</td>
</tr>

<tr>
<td>RAM</td>
<td>12GB</td>
</tr>

<tr>
<td>Storage</td>
<td>128GB SSD</td>
</tr>

<tr>
<td>Battery</td>
<td>5000mAh</td>
</tr>

</tbody>

</table>

</Card>

{/* REVIEW FORM */}

<Card className="p-4">

<h5>Leave Your Opinion</h5>

<Form>

<Row>

<Col md={6}>
<Form.Control placeholder="Name" className="mb-3"/>
</Col>

<Col md={6}>
<Form.Control placeholder="Email" className="mb-3"/>
</Col>

</Row>

<Form.Control
as="textarea"
rows={4}
placeholder="Description"
className="mb-3"
/>

<Button variant="primary">
Post Review
</Button>

</Form>

</Card>

</Col>

{/* SIDEBAR */}

<Col lg={3}>

<Card className="p-3 mb-4">

<h6>Top Product Review</h6>

{topProducts.map((item)=>(

<div
key={item.id}
style={{
display:"flex",
marginBottom:"18px",
alignItems:"center"
}}
>

{/* SMALL IMAGE BOX */}

<div style={{
width:"55px",
height:"55px",
background:"#f8f8f8",
borderRadius:"6px",
display:"flex",
alignItems:"center",
justifyContent:"center",
overflow:"hidden"
}}>

<img
src={BASE_URL + item.image}
alt={item.title}
style={{
maxWidth:"90%",
maxHeight:"90%",
objectFit:"contain"
}}
/>

</div>

{/* TEXT */}

<div style={{
marginLeft:"12px",
fontSize:"13px",
flex:"1"
}}>

<div style={{
fontWeight:"500",
lineHeight:"1.3",
marginBottom:"3px"
}}>
{item.title}
</div>

<div style={{
color:"#ffc107",
fontSize:"12px"
}}>
★★★★★
</div>

</div>

</div>

))}

</Card>

</Col>

</Row>

</Container>

</section>

<InstagramSection/>

</>

)

}

export default ReviewDetails
