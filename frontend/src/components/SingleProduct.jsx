import { Container, Row, Col, Card } from "react-bootstrap"
import ProductTabsSection from "./ProductTabsSection"
import InstagramSection from "./InstagramSection"

const Details = () => {

const product = {
title: "Wireless Speaker Black",
price: 390,
description: "High quality wireless speaker with powerful bass and clear sound. Perfect for music lovers and portable use.",
rating: 4.5,
category: "Electronics",
image: "/images/product-details-img.png"
}

return (
<>
<section style={{padding:"60px 0"}}>

<Container>

<Row>

<Col md={6}>

<Card className="p-4 border-0">

<img
src={product.image}
alt={product.title}
style={{width:"100%"}}
/>

</Card>

</Col>

<Col md={6}>

<h2>{product.title}</h2>

<h4 style={{color:"#ff4c3b"}}>${product.price}</h4>

<p>{product.description}</p>

<p><strong>Rating:</strong> {product.rating}</p>

<p><strong>Category:</strong> {product.category}</p>

</Col>

</Row>

</Container>

</section>

<ProductTabsSection />

<InstagramSection/>
</>
)

}

export default Details