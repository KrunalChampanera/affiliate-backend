import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  Modal,
  Badge,
  Pagination
} from "react-bootstrap";
import API from "../services/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    status: true
  });

  useEffect(() => {
    fetchCategories();
  }, [page, search, statusFilter]);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories", {
        params: {
          page,
          limit: 10,
          search,
          status: statusFilter
        }
      });

      const data = res.data;

      if (data && Array.isArray(data.categories)) {
        setCategories(data.categories);
        setTotalPages(data.totalPages || 1);
      } else if (Array.isArray(data)) {
        setCategories(data);
        setTotalPages(1);
      } else {
        setCategories([]);
        setTotalPages(1);
      }

    } catch (err) {
      console.error(err);
      setCategories([]);
      setTotalPages(1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    try {
      if (editingCategory) {
        await API.put(`/categories/${editingCategory.id}`, formData);
      } else {
        await API.post("/categories", formData);
      }

      setShowModal(false);
      setEditingCategory(null);
      setFormData({ name: "", status: true });
      fetchCategories();

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || "",
      status: category.status ?? true
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await API.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (category) => {
    try {
      await API.patch(`/categories/${category.id}/status`, {
        status: !category.status
      });
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">Manage Categories</h4>
                <Button onClick={() => setShowModal(true)}>
                  Add Category
                </Button>
              </div>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Control
                    placeholder="Search categories..."
                    value={search || ""}
                    onChange={(e) => {
                      setPage(1);
                      setSearch(e.target.value);
                    }}
                  />
                </Col>

                <Col md={3}>
                  <Form.Select
                    value={statusFilter || ""}
                    onChange={(e) => {
                      setPage(1);
                      setStatusFilter(e.target.value);
                    }}
                  >
                    <option value="">All Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </Form.Select>
                </Col>
              </Row>

              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((cat, index) => (
                      <tr key={cat.id}>
                        <td>{index + 1}</td>
                        <td>{cat.name}</td>
                        <td>{cat.slug}</td>
                        <td>
                          <Badge
                            bg={cat.status ? "success" : "secondary"}
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleStatus(cat)}
                          >
                            {cat.status ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td>
                          {new Date(cat.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <Button
                            size="sm"
                            variant="warning"
                            className="me-2"
                            onClick={() => handleEdit(cat)}
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(cat.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Categories Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <Pagination>
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i}
                    active={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCategory ? "Edit Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Check
              type="switch"
              label="Active"
              checked={!!formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.checked })
              }
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {editingCategory ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Categories;