import PageHeader from "../components/PageHeader";
import { Container , Row , Col , Accordion } from "react-bootstrap";
import { FaUsers, FaBalanceScale, FaStore, FaStar } from "react-icons/fa";
import { useState } from "react";
import InstagramSection from "../components/InstagramSection";


const Faq = () => {
  const [active,setActive] = useState("0")
  const faqData = [
{
id:"0",
number:"01",
question:"What are the most common activities during camping?",
answer:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna porta elit vitae dignissim volutpat pellentesque. Sed fermentum egestas volutpat magna volutpat at."
},
{
id:"1",
number:"02",
question:"What are the advantages and disadvantages of camping?",
answer:"Camping offers relaxation and nature connection but requires preparation and physical effort."
},
{
id:"2",
number:"03",
question:"How does camping benefit your body and mind?",
answer:"Camping reduces stress, improves mood, and increases physical activity."
},
{
id:"3",
number:"04",
question:"What are the benefits of camping with family and friends?",
answer:"It strengthens relationships and builds shared memories."
},
{
id:"4",
number:"05",
question:"How does camping help your growth and development?",
answer:"Camping teaches independence, survival skills, and teamwork."
},
{
id:"5",
number:"06",
question:"What are the five important things to bring camping?",
answer:"Tent, food, water, flashlight, and sleeping bag."
}
];

const features = [
{
icon: <FaUsers size={30} />,
title: "Social Business",
desc: "Quis nostrum exercitationem corporis suscipit labor"
},
{
icon: <FaBalanceScale size={30} />,
title: "Price Comparison",
desc: "Quis nostrum exercitationem corporis suscipit labor"
},
{
icon: <FaStore size={30} />,
title: "Multivendor store",
desc: "Quis nostrum exercitationem corporis suscipit labor"
},
{
icon: <FaStar size={30} />,
title: "Product Review",
desc: "Quis nostrum exercitationem corporis suscipit labor"
}
];

const images = [
"/images/instagram-img-1.png",
"/images/instagram-img-2.png",
"/images/instagram-img-3.png",
"/images/instagram-img-4.png",
"/images/instagram-img-5.png",
"/images/instagram-img-6.png"
];

  return (
    <>
      <PageHeader title="Frequently Asked Questions" />

       <section style={{padding:"80px 0",background:"#f8f8f8"}}>

<Container>

<div style={{textAlign:"center",marginBottom:"50px"}}>
<p style={{color:"#0d6efd",marginBottom:"10px"}}>Some Questions</p>

<h2 style={{fontWeight:"600"}}>
Some Answers Of The Questions <br/>
You Want To Know
</h2>
</div>

<Row className="align-items-center">

<Col lg={6}>

<Accordion activeKey={active} onSelect={(e)=>setActive(e)}>

{faqData.map((item,index)=>(
<Accordion.Item eventKey={item.id} key={index}
style={{
borderRadius:"10px",
marginBottom:"15px",
border:"1px solid #e6e6e6"
}}
>

<Accordion.Header>

<div style={{display:"flex",alignItems:"center",gap:"15px"}}>

<span style={{
color:"#0d6efd",
fontWeight:"600"
}}>
{item.number}
</span>

<span style={{fontWeight:"500"}}>
{item.question}
</span>

</div>

</Accordion.Header>

<Accordion.Body style={{color:"#6c757d"}}>
{item.answer}
</Accordion.Body>

</Accordion.Item>
))}

</Accordion>

</Col>

<Col lg={6}>

<img
src="/images/faqs.jpg"
alt="faq"
style={{
width:"100%",
borderRadius:"10px"
}}
/>

</Col>

</Row>

</Container>

</section>

{/* section 2 */}

<section style={{background:"#f3f3f3",padding:"60px 0"}}>

<Container>

<Row className="text-center">

{features.map((item,index)=>(

<Col lg={3} md={6} key={index} className="mb-4">

<div style={{display:"flex",gap:"15px",alignItems:"flex-start"}}>

<div style={{color:"#666"}}>
{item.icon}
</div>

<div style={{textAlign:"left"}}>

<h6 style={{fontWeight:"600"}}>
{item.title}
</h6>

<p style={{
fontSize:"14px",
color:"#777",
marginBottom:"0"
}}>
{item.desc}
</p>

</div>

</div>

</Col>

))}

</Row>

</Container>

</section>

{/* section 3 */}

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

<InstagramSection/>

    </>
  );
};

export default Faq;