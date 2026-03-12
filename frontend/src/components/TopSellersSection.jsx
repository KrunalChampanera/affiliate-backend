import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import API from "../services/api";

const BASE_URL = "http://localhost:5000/uploads/";

const TopSellers = () => {

const [banner,setBanner] = useState(null);
const [products,setProducts] = useState([]);

useEffect(()=>{
fetchData();
},[]);

const fetchData = async () => {

try{

const bannerRes = await API.get("/banners");
const productRes = await API.get("/products");

const topBanner = bannerRes.data.find(
b => b.position === "top-seller"
);

const topProducts = productRes.data.filter(
p => p.isTopDeal === true
);
setBanner(topBanner);
setProducts(topProducts.slice(0,6));

}catch(err){
console.log(err);
}

};

return(

<section className="py-5">

<Container>

<h2 className="text-center mb-5">Top Sellers Products</h2>

<Row>

<Col lg={4} md={12} className="mb-4">

{banner && (

<div
className="p-4 h-100 text-center text-white rounded"
style={{backgroundColor: banner.backgroundColor}}
>

<small>{banner.subtitle}</small>

<h4 className="mb-3">{banner.title}</h4>

<Button className="rounded-pill px-4 mb-4">
{banner.buttonText || "Shop Now"}
</Button>

<img
src={BASE_URL + banner.image}
alt=""
className="img-fluid"
/>

</div>

)}

</Col>


<Col lg={8} md={12}>

<Row>

{products.map(product => (

<Col lg={4} md={6} className="mb-4" key={product.id}>

<div className="text-center">

<div className="bg-light p-3 mb-3">

<img
src={BASE_URL + product.image}
alt=""
className="img-fluid"
/>

</div>

<div className="mb-1">

{"⭐".repeat(product.rating || 4)}

</div>

<h6 className="mb-1">
{product.title}
</h6>

<p className="text-danger fw-bold">
${product.price}
</p>

</div>

</Col>

))}

</Row>

</Col>

</Row>

</Container>

</section>

);

};

export default TopSellers;