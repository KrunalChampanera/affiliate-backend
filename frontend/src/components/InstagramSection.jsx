import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const images = [
"/images/instagram-img-1.png",
"/images/instagram-img-2.png",
"/images/instagram-img-3.png",
"/images/instagram-img-4.png",
"/images/instagram-img-5.png",
"/images/instagram-img-6.png"
];

const InstagramSection = () => {

return (

<section className="py-5 bg-white">

<Container>

<h2 className="text-center mb-4" style={{fontWeight:"600"}}>
Torado’s Instagram
</h2>

<hr className="mb-5"/>

<Row className="g-4">

{images.map((img,index)=>(

<Col lg={2} md={4} sm={6} xs={6} key={index}>

<div className="instagram-card">

<img
src={img}
alt="instagram"
className="img-fluid"
/>

</div>

</Col>

))}

</Row>

</Container>

</section>

);

};

export default InstagramSection;