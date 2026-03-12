import { useState } from "react"
import { Container, Row, Col, Nav, Card, Form, Button } from "react-bootstrap"
import InstagramSection from "./InstagramSection"

const ProductTabsSection = () => {

const [activeTab,setActiveTab] = useState("description")

return (
<>
<section style={{padding:"60px 0",background:"#f7f7f7"}}>

<Container>

<Nav variant="tabs" className="mb-4">

<Nav.Item>
<Nav.Link active={activeTab==="description"} onClick={()=>setActiveTab("description")}>
Description
</Nav.Link>
</Nav.Item>

<Nav.Item>
<Nav.Link active={activeTab==="spec"} onClick={()=>setActiveTab("spec")}>
Full Specification
</Nav.Link>
</Nav.Item>

<Nav.Item>
<Nav.Link active={activeTab==="reviews"} onClick={()=>setActiveTab("reviews")}>
Reviews
</Nav.Link>
</Nav.Item>

<Nav.Item>
<Nav.Link active={activeTab==="price"} onClick={()=>setActiveTab("price")}>
Price History
</Nav.Link>
</Nav.Item>

</Nav>

{/* DESCRIPTION TAB */}

{activeTab==="description" && (

<div>

<h5 className="mb-3">Quality Of Bullet Combs</h5>

<p>
Architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
</p>

<h6 className="mt-4">Are You In Danger Of Becoming Addicted To Television?</h6>

<ul>
<li>APPLE 10.9” iPad Air (2020) – 256 GB, Sky Blue</li>
<li>Water-Soluble, High Absorption</li>
<li>Full-Spectrum</li>
<li>WP My Cloud Home NAS Drive</li>
<li>EU Sourced Hemp</li>
<li>BEATZ Studio 3 Wireless Bluetooth Headphones</li>
</ul>

</div>

)}

{/* SPECIFICATION TAB */}

{activeTab==="spec" && (

<div>

<h5 className="mb-4">Full Specification</h5>

<Row>

<Col md={4}>Network :</Col>
<Col md={8}>GSM / HSPA / LTE</Col>

<Col md={4}>Launch :</Col>
<Col md={8}>Released 2025, March</Col>

<Col md={4}>Body :</Col>
<Col md={8}>152.2 x 78.7 x 7.5 mm</Col>

<Col md={4}>Display :</Col>
<Col md={8}>Super AMOLED touchscreen</Col>

<Col md={4}>Platform :</Col>
<Col md={8}>Android 5.1 (Lollipop)</Col>

<Col md={4}>Memory :</Col>
<Col md={8}>Internal 16GB, 3GB RAM</Col>

<Col md={4}>Main Camera :</Col>
<Col md={8}>13 MP</Col>

</Row>

</div>

)}

{/* REVIEWS TAB */}

{activeTab==="reviews" && (

<div>

<h5 className="mb-4">Leave Your Opinion Here</h5>

<Row>

<Col md={6}>
<Form.Control placeholder="Name" className="mb-3"/>
</Col>

<Col md={6}>
<Form.Control placeholder="Email" className="mb-3"/>
</Col>

<Col md={12}>
<Form.Control as="textarea" rows={3} placeholder="Description" className="mb-3"/>
</Col>

<Col md={6}>
<Form.Control as="textarea" rows={3} placeholder="Pros"/>
</Col>

<Col md={6}>
<Form.Control as="textarea" rows={3} placeholder="Cons"/>
</Col>

</Row>

<Button className="mt-3">Post Review</Button>

</div>

)}

{/* PRICE HISTORY TAB */}

{activeTab==="price" && (

<div>

<h5 className="mb-4">Price History & Chart</h5>

<Row>

<Col md={4}>

<Card className="p-3 text-center">

<h3>50%</h3>
<p>Since Last Month</p>

</Card>

</Col>

<Col md={4}>

<Card className="p-3 text-center">

<h3>15%</h3>
<p>Last 10 Days</p>

</Card>

</Col>

<Col md={4}>

<Card className="p-3 text-center">

<h3>90%</h3>
<p>Since Last Year</p>

</Card>

</Col>

</Row>

</div>

)}

</Container>

</section>

<InstagramSection/>

</>

)

}

export default ProductTabsSection