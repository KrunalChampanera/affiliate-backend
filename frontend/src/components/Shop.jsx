import { useEffect, useState } from "react"
import { Container, Row, Col, Form, InputGroup, FormControl, Card } from "react-bootstrap"
import API from "../services/api"
import { Link } from "react-router-dom"
import InstagramSection from "./InstagramSection"
import PageHeader from "./PageHeader"

const BASE_URL = "http://localhost:5000/uploads/"

const Shop = () => {

const [products,setProducts] = useState([])
const [search,setSearch] = useState("")
const [sort,setSort] = useState("default")
const [currentPage,setCurrentPage] = useState(1)

const productsPerPage = 8

useEffect(()=>{
fetchProducts()
},[])

const fetchProducts = async () => {
try{
const res = await API.get("/products")
setProducts(res.data)
}catch(err){
console.log(err)
}
}

const filtered = [...products]

.filter(p =>
p.title.toLowerCase().includes(search.toLowerCase())
)

.sort((a,b)=>{

if(sort==="priceLow") return a.price - b.price

if(sort==="priceHigh") return b.price - a.price

if(sort==="rating") return (b.rating || 0) - (a.rating || 0)

if(sort==="newest") return b.id - a.id

if(sort==="nameAZ") return a.title.localeCompare(b.title)

if(sort==="nameZA") return b.title.localeCompare(a.title)

return 0
})

const indexOfLast = currentPage * productsPerPage
const indexOfFirst = indexOfLast - productsPerPage

const currentProducts = filtered.slice(indexOfFirst,indexOfLast)

const totalPages = Math.ceil(filtered.length / productsPerPage)

return(
<>
    <PageHeader title="Shop" breadcrumb="Shop"  />


<section style={{padding:"60px 0"}}>

<Container>

<Row className="mb-4">

<Col md={4}>
<p>
Showing {indexOfFirst + 1}-
{Math.min(indexOfLast,filtered.length)} of {filtered.length} results
</p>
</Col>

<Col md={4}>
<InputGroup>

<FormControl
placeholder="Search Product"
value={search}
onChange={(e)=>{
setSearch(e.target.value)
setCurrentPage(1)
}}
/>

</InputGroup>
</Col>

<Col md={4}>

<Form.Select
value={sort}
onChange={(e)=>{
setSort(e.target.value)
setCurrentPage(1)
}}
>

<option value="default">Default Sorting</option>
<option value="priceLow">Price: Low to High</option>
<option value="priceHigh">Price: High to Low</option>
<option value="rating">Rating High to Low</option>
<option value="newest">Newest First</option>
<option value="nameAZ">Name A - Z</option>
<option value="nameZA">Name Z - A</option>

</Form.Select>

</Col>

</Row>

<Row>

{currentProducts.map(product =>(
<Col md={3} className="mb-4" key={product.id}>

<Link to={`/product/${product.id}`} style={{textDecoration:"none"}}>

<Card className="border-0 text-center">

<Card.Img
variant="top"
src={BASE_URL + product.image}
style={{height:"220px",objectFit:"contain"}}
/>

<Card.Body>

<Card.Title style={{fontSize:"15px",color:"#000"}}>
{product.title}
</Card.Title>

<div>

<span style={{color:"red",fontWeight:"600"}}>
${product.price}
</span>

{product.oldPrice && (
<span style={{
marginLeft:"10px",
textDecoration:"line-through",
color:"#999"
}}>
${product.oldPrice}
</span>
)}

</div>

</Card.Body>

</Card>

</Link>

</Col>
))}

</Row>

<Row>
<Col className="text-center mt-4">

{Array.from({length: totalPages}, (_,i)=>(
<button
key={i}
onClick={()=>setCurrentPage(i+1)}
style={{
margin:"5px",
padding:"8px 14px",
border:"1px solid #ddd",
background: currentPage===i+1 ? "#0d6efd" : "#fff",
color: currentPage===i+1 ? "#fff" : "#000",
borderRadius:"4px"
}}
>
{i+1}
</button>
))}

</Col>
</Row>

</Container>

</section>

<InstagramSection/>

</>
)

}

export default Shop