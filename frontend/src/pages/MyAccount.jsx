import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import InstagramSection from "../components/InstagramSection"
import PageHeader from "../components/PageHeader"

const MyAccount = () => {

const navigate = useNavigate()

const [login,setLogin] = useState({
email:"",
password:""
})

const [register,setRegister] = useState({
name:"",
email:"",
password:""
})

const handleLogin = async(e)=>{

e.preventDefault()

try{

const res = await API.post("/auth/login",login)

localStorage.setItem("token",res.data.token)
localStorage.setItem("user",JSON.stringify(res.data.user))

alert("Login Successful")

navigate("/profile")

}catch(err){

alert(err.response?.data?.message || "Login failed")

}

}

const handleRegister = async(e)=>{

e.preventDefault()

try{

await API.post("/auth/register",register)

alert("Registration Successful. Please login.")

setRegister({
name:"",
email:"",
password:""
})

}catch(err){

alert(err.response?.data?.message || "Registration failed")

}

}

return(
<>

<PageHeader title="MyAccount" breadcrumb="MyAccount" />

<section style={{padding:"80px 0"}}>

<Container>

<Row>

<Col lg={6}>

<div className="border p-5">

<h3 className="mb-4">Log In</h3>

<Form onSubmit={handleLogin}>

<Form.Control
placeholder="User Name Or Email"
className="mb-3"
value={login.email}
onChange={(e)=>setLogin({...login,email:e.target.value})}
/>

<Form.Control
type="password"
placeholder="Password"
className="mb-3"
value={login.password}
onChange={(e)=>setLogin({...login,password:e.target.value})}
/>

<div className="d-flex justify-content-between mb-3">

<Form.Check label="Remember Me"/>

<a href="/forgot-password">Forgot Password?</a>

</div>

<Button
type="submit"
style={{
background:"#2b8db9",
border:"none",
width:"100%",
padding:"12px",
borderRadius:"30px"
}}

>

Login Now </Button>

</Form>

</div>

</Col>

<Col lg={6}>

<div className="border p-5">

<h3 className="mb-4">Register</h3>

<Form onSubmit={handleRegister}>

<Form.Control
placeholder="User Name"
className="mb-3"
value={register.name}
onChange={(e)=>setRegister({...register,name:e.target.value})}
/>

<Form.Control
placeholder="Email"
className="mb-3"
value={register.email}
onChange={(e)=>setRegister({...register,email:e.target.value})}
/>

<Form.Control
type="password"
placeholder="Password"
className="mb-4"
value={register.password}
onChange={(e)=>setRegister({...register,password:e.target.value})}
/>

<Button
type="submit"
variant="outline-primary"
style={{
width:"100%",
padding:"12px",
borderRadius:"30px"
}}

>

Register Now </Button>

</Form>

</div>

</Col>

</Row>

</Container>

</section>

<InstagramSection/>

</>
)

}

export default MyAccount
