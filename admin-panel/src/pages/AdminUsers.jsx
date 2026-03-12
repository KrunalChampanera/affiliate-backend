import { useEffect,useState } from "react";
import API from "../services/api";
import { Table,Button,Container } from "react-bootstrap";

const AdminUsers = () => {

const [users,setUsers] = useState([]);
const [logs,setLogs] = useState([]);

const loadUsers = async ()=>{
const res = await API.get("/admin/users");
setUsers(res.data);
};

const loadLogs = async ()=>{
const res = await API.get("/admin/logins");
setLogs(res.data);
};

useEffect(()=>{
loadUsers();
loadLogs();
},[]);

const deleteUser = async(id)=>{

if(window.confirm("Delete this user?")){

await API.delete(`/admin/users/${id}`);

loadUsers();

}

};

return(

<Container style={{padding:"40px"}}>

<h3>Registered Users</h3>

<Table bordered>

<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{users.map(user=>(
<tr key={user.id}>
<td>{user.id}</td>
<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.role}</td>
<td>

<Button
variant="danger"
onClick={()=>deleteUser(user.id)}
>
Delete
</Button>

</td>
</tr>
))}

</tbody>

</Table>


<h3 className="mt-5">Login Activity</h3>

<Table bordered>

<thead>
<tr>
<th>User ID</th>
<th>Email</th>
<th>Login Time</th>
</tr>
</thead>

<tbody>

{logs.map(log=>(
<tr key={log.id}>
<td>{log.userId}</td>
<td>{log.email}</td>
<td>{log.loginTime}</td>
</tr>
))}

</tbody>

</Table>

</Container>

)

};

export default AdminUsers;