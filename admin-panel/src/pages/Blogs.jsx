import { useEffect, useState } from "react";
import API from "../services/api";

const BASE_URL = "http://localhost:5000/uploads/";

const Blogs = () => {

const [blogs,setBlogs] = useState([]);
const [editId,setEditId] = useState(null);

const [form,setForm] = useState({
title:"",
description:"",
author:"Admin",
image:null
});

const [preview,setPreview] = useState(null);

useEffect(()=>{
fetchBlogs();
},[]);

const fetchBlogs = async ()=>{
try{
const res = await API.get("/blogs");
setBlogs(Array.isArray(res.data) ? res.data : []);
}catch(err){
console.log(err);
}
};

const handleChange = (e)=>{
const {name,value} = e.target;
setForm({
...form,
[name]:value
});
};

const handleImageChange = (e)=>{
const file = e.target.files[0];
if(!file) return;

setForm({...form,image:file});
setPreview(URL.createObjectURL(file));
};

const handleSubmit = async (e)=>{
e.preventDefault();

const formData = new FormData();

formData.append("title",form.title);
formData.append("description",form.description);
formData.append("author",form.author);

if(form.image){
formData.append("image",form.image);
}

try{

if(editId){

await API.put(`/blogs/${editId}`,formData,{
headers:{ "Content-Type":"multipart/form-data"}
});

}else{

await API.post("/blogs",formData,{
headers:{ "Content-Type":"multipart/form-data"}
});

}

resetForm();
fetchBlogs();

}catch(err){
console.log(err);
}

};

const resetForm = ()=>{
setEditId(null);
setForm({
title:"",
description:"",
author:"Admin",
image:null
});
setPreview(null);
};

const handleEdit = (blog)=>{

setEditId(blog.id);

setForm({
title:blog.title || "",
description:blog.description || "",
author:blog.author || "Admin",
image:null
});

if(blog.image){
setPreview(`${BASE_URL}${blog.image}`);
}

};

const handleDelete = async (id)=>{
try{
await API.delete(`/blogs/${id}`);
fetchBlogs();
}catch(err){
console.log(err);
}
};

return(

<div>

<h4 className="mb-4">Blogs</h4>

<form onSubmit={handleSubmit} className="mb-4">

<div className="row">

<div className="col-md-3">
<input
className="form-control mb-2"
placeholder="Blog Title"
name="title"
value={form.title}
onChange={handleChange}
required
/>
</div>

<div className="col-md-3">
<input
className="form-control mb-2"
placeholder="Author"
name="author"
value={form.author}
onChange={handleChange}
/>
</div>

<div className="col-md-4">
<input
className="form-control mb-2"
placeholder="Description"
name="description"
value={form.description}
onChange={handleChange}
/>
</div>

<div className="col-md-2">
<input
type="file"
className="form-control mb-2"
onChange={handleImageChange}
/>
</div>

</div>

{preview && (
<div className="mb-3">
<img
src={preview}
alt=""
style={{height:"100px"}}
/>
</div>
)}

<button className="btn btn-primary">
{editId ? "Update Blog" : "Create Blog"}
</button>

</form>

<table className="table table-bordered">

<thead>
<tr>
<th>Image</th>
<th>Title</th>
<th>Author</th>
<th>Date</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{blogs.length > 0 ? (

blogs.map(blog => (

<tr key={blog.id}>

<td>
{blog.image && (
<img
src={`${BASE_URL}${blog.image}`}
alt=""
style={{height:"60px"}}
/>
)}
</td>

<td>{blog.title}</td>
<td>{blog.author}</td>
<td>{new Date(blog.createdAt).toLocaleDateString()}</td>

<td>

<button
className="btn btn-sm btn-warning me-2"
onClick={()=>handleEdit(blog)}
>
Edit
</button>

<button
className="btn btn-sm btn-danger"
onClick={()=>handleDelete(blog.id)}
>
Delete
</button>

</td>

</tr>

))

):( 

<tr>
<td colSpan="5" className="text-center">
No Blogs Found
</td>
</tr>

)}

</tbody>

</table>

</div>

);

};

export default Blogs;