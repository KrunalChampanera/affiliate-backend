import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Form, InputGroup } from "react-bootstrap"
import API from "../services/api"
import { Link } from "react-router-dom"
import InstagramSection from "./InstagramSection"

const BASE_URL = "http://localhost:5000/uploads/"

const Reviews = () => {

const [products,setProducts] = useState([])
const [search,setSearch] = useState("")
const [sort,setSort] = useState("default")
const [activeCategory,setActiveCategory] = useState("All")

const fetchProducts = async () => {
const res = await API.get("/products")
setProducts(res.data)
}

useEffect(()=>{
fetchProducts()
},[])

const categories = ["All",...new Set(products.map(p=>p.category))]

let filteredProducts = [...products]

if(activeCategory !== "All"){
filteredProducts = filteredProducts.filter(p => p.category === activeCategory)
}

filteredProducts = filteredProducts.filter(p =>
p.title.toLowerCase().includes(search.toLowerCase())
)

if(sort === "low"){
filteredProducts.sort((a,b)=>a.price-b.price)
}

if(sort === "high"){
filteredProducts.sort((a,b)=>b.price-a.price)
}

return (
<>
<section style={{padding:"60px 0",background:"#f5f5f5"}}>

<Container>

<Row className="mb-4">

<Col md={6}>
<h6>Showing {filteredProducts.length} results</h6>
</Col>

<Col md={3}>
<InputGroup>
<Form.Control
placeholder="Search"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
</InputGroup>
</Col>

<Col md={3}>
<Form.Select onChange={(e)=>setSort(e.target.value)}>
<option value="default">Default Sorting</option>
<option value="low">Price Low To High</option>
<option value="high">Price High To Low</option>
</Form.Select>
</Col>

</Row>

<Row>

<Col lg={9}>

<Row>

{filteredProducts.map((item)=>(
<Col md={6} className="mb-4" key={item.id}>

<Link to={`/review/${item.id}`} style={{textDecoration:"none",color:"inherit"}}>

<Card className="h-100 shadow-sm">

<Card.Img
variant="top"
src={BASE_URL + item.image}
style={{height:"220px",objectFit:"contain",padding:"20px"}}
/>

<Card.Body>

<h6>{item.title}</h6>

<div style={{fontSize:"13px",color:"#888"}}>
Reviewed By Admin
</div>

<div style={{color:"#ffc107"}}>★★★★★</div>

<p style={{fontSize:"13px",marginTop:"10px"}}>
{item.description?.substring(0,90)}...
</p>

</Card.Body>

</Card>

</Link>

</Col>
))}

</Row>

</Col>

<Col lg={3}>

<Card className="p-3 mb-4">

<h6>Review Category</h6>

<ul style={{listStyle:"none",padding:0}}>

{categories.map((cat)=>(
<li
key={cat}
onClick={()=>setActiveCategory(cat)}
style={{
cursor:"pointer",
padding:"6px 0",
color: activeCategory===cat ? "#ff4d4d" : "#555",
fontWeight: activeCategory===cat ? "600" : "400"
}}
>
{cat}
</li>
))}

</ul>

</Card>

<Card className="p-3">

<h6>Top Product Review</h6>

{products.slice(0,4).map((item)=>(
<div key={item.id} style={{display:"flex",marginBottom:"15px"}}>

<img
src={BASE_URL + item.image}
style={{width:"50px",height:"50px",objectFit:"contain"}}
/>

<div style={{marginLeft:"10px",fontSize:"13px"}}>
<div>{item.title}</div>
<div style={{color:"#ffc107"}}>★★★★★</div>
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

export default Reviews