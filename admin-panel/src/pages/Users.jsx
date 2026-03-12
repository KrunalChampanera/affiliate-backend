import { useEffect, useState } from "react";
import API from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    await API.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  const updateUser = async () => {
    await API.put(`/admin/users/${editUser.id}`, {
      name: editUser.name,
      email: editUser.email,
    });
    setEditUser(null);
    fetchUsers();
  };

  return (
    <div>
      <h4 className="mb-4">Users</h4>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th width="180">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditUser(user)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editUser && (
        <div className="card p-3 mt-4">
          <h5>Edit User</h5>

          <input
            className="form-control mb-2"
            value={editUser.name}
            onChange={(e) =>
              setEditUser({ ...editUser, name: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />

          <button className="btn btn-success me-2" onClick={updateUser}>
            Save
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => setEditUser(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}