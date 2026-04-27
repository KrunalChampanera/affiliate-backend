import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import API from "../services/api";

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/";

const PopularBlogs = () => {

const [blogs,setBlogs] = useState([]);

useEffect(()=>{
fetchBlogs();
},[]);

const fetchBlogs = async () => {
try{

const res = await API.get("/blogs");

setBlogs(res.data);

}catch(err){
console.log(err);
}
};

const leftBlogs = blogs.slice(0,2);
const mainBlog = blogs[2];

return (

<section className="py-5">

<Container>

<div className="d-flex justify-content-between align-items-center mb-4">

<h2 className="fw-bold">Most Popular Blog Posts</h2>

<Button
variant="danger"
className="rounded-pill px-4"
>
View All
</Button>

</div>

<Row>

<Col lg={5}>

{leftBlogs.map(blog => (

<div key={blog.id} className="d-flex mb-4 border-bottom pb-3">

<img
src={BASE_URL + blog.image}
alt=""
style={{
width:"120px",
height:"100px",
objectFit:"cover",
marginRight:"15px"
}}
/>

<div>

<div className="text-muted small mb-1">

By Admin • {new Date(blog.createdAt).toLocaleDateString()}

</div>

<h6 className="fw-semibold">

{blog.title}

</h6>

</div>

</div>

))}

</Col>


<Col lg={7}>

{mainBlog && (

<div>

<img
src={BASE_URL + mainBlog.image}
alt=""
className="img-fluid mb-3"
/>

<div className="text-muted small mb-2">

By Admin • {new Date(mainBlog.createdAt).toLocaleDateString()}

</div>

<h5 className="fw-semibold mb-3">

{mainBlog.title}

</h5>

<p>

{mainBlog.description?.slice(0,120)}...

</p>

</div>

)}

</Col>

</Row>

</Container>

</section>

);

};

export default PopularBlogs;