import { useEffect, useState } from "react"
import { Table, Button, Container, Form } from "react-bootstrap"
import API from "../services/api"

const Orders = () => {

const [orders,setOrders] = useState([])

const fetchOrders = async ()=>{

try{

const res = await API.get("/admin/orders")

setOrders(res.data)

}catch(err){

console.log("Fetch Orders Error:",err)

}

}

useEffect(()=>{
fetchOrders()
},[])

const deleteOrder = async(id)=>{

if(!window.confirm("Delete this order?")) return

try{

await API.delete(`/admin/orders/${id}`)

fetchOrders()

}catch(err){

console.log("Delete Order Error:",err)

}

}

const updateStatus = async(id,status)=>{

try{

await API.put(`/admin/orders/${id}`,{status})

fetchOrders()

}catch(err){

console.log("Update Status Error:",err)

}

}

return(

<Container style={{padding:"60px 0"}}>

<h3 className="mb-4">All Orders</h3>

<Table bordered hover>

<thead>

<tr>
<th>ID</th>
<th>User</th>
<th>Email</th>
<th>Total</th>
<th>Payment</th>
<th>Status</th>
<th>Date</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{orders.length === 0 ? (

<tr>
<td colSpan="8" className="text-center">
No Orders Found
</td>
</tr>

) : (

orders.map(order=>(

<tr key={order.id}>

<td>{order.id}</td>

<td>{order.User?.name || "N/A"}</td>

<td>{order.User?.email || "N/A"}</td>

<td>${order.totalAmount}</td>

<td>{order.payment || "N/A"}</td>

<td>

<Form.Select
value={order.status}
onChange={(e)=>updateStatus(order.id,e.target.value)}

>

<option value="pending">Pending</option>
<option value="processing">Processing</option>
<option value="shipped">Shipped</option>
<option value="completed">Completed</option>
<option value="cancelled">Cancelled</option>

</Form.Select>

</td>

<td>
{new Date(order.createdAt).toLocaleDateString()}
</td>

<td>

<Button
variant="danger"
size="sm"
onClick={()=>deleteOrder(order.id)}

>

Delete </Button>

</td>

</tr>

))

)}

</tbody>

</Table>

</Container>

)

}

export default Orders
