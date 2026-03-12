import { useEffect, useState } from "react";
import API from "../services/api";

const BASE_URL = "http://localhost:5000/uploads/";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    rating: "",
    CategoryId: "",
    isTopDeal: false,
    isPopular: false,
    isNew: false,
    shopInShop: false,
    image: null
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      if (Array.isArray(res.data)) {
        setCategories(res.data);
      } else if (res.data.categories) {
        setCategories(res.data.categories);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error(err);
      setCategories([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach(key => {
      if (key !== "image") {
        formData.append(key, form[key]);
      }
    });

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (editId) {
        await API.put(`/products/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await API.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      resetForm();
      fetchProducts();

    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      title: "",
      price: "",
      description: "",
      rating: "",
      CategoryId: "",
      isTopDeal: false,
      isPopular: false,
      isNew: false,
      shopInShop: false,
      image: null
    });
    setPreview(null);
  };

  const handleEdit = (product) => {
    setEditId(product.id);

    setForm({
      title: product.title || "",
      price: product.price || "",
      description: product.description || "",
      rating: product.rating || "",
      CategoryId: product.CategoryId || "",
      isTopDeal: !!product.isTopDeal,
      isPopular: !!product.isPopular,
      isNew: !!product.isNew,
      isShop: !!product.isShop,
      image: null
    });

    if (product.image) {
      setPreview(`${BASE_URL}${product.image}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTopSeller = async (product) => {
  try {

    const formData = new FormData();

    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("rating", product.rating);
    formData.append("CategoryId", product.CategoryId);

    formData.append("isTopDeal", !product.isTopDeal);
    formData.append("isPopular", product.isPopular);
    formData.append("isNew", product.isNew);
    formData.append("isShop", product.isShop);

    await API.put(`/products/${product.id}`, formData);

    fetchProducts();

  } catch (err) {
    console.error(err);
  }
};

  const getCategoryName = (CategoryId) => {
    const Category = categories.find(c => c.id === CategoryId);
    return Category ? Category.name : "—";
  };

  return (
    <div>
      <h4 className="mb-3">Products</h4>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">

          <div className="col-md-3">
            <input
              className="form-control mb-2"
              placeholder="Product Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control mb-2"
              placeholder="Price"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control mb-2"
              placeholder="Rating"
              name="rating"
              value={form.rating}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-control mb-2"
              name="CategoryId"
              value={form.CategoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {Array.isArray(categories) &&
                categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-md-3">
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

          <div className="col-md-2 d-flex align-items-center">
            <label className="me-2">Top Deal</label>
            <input
              type="checkbox"
              name="isTopDeal"
              checked={form.isTopDeal}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2 d-flex align-items-center">
             <label className="me-2">Shop</label>
              <input
               type="checkbox"
               name="showInShop"
               checked={form.showInShop}
               onChange={handleChange}
                />
            </div>      

          <div className="col-md-2 d-flex align-items-center">
            <label className="me-2">Popular</label>
            <input
              type="checkbox"
              name="isPopular"
              checked={form.isPopular}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2 d-flex align-items-center">
            <label className="me-2">New</label>
            <input
              type="checkbox"
              name="isNew"
              checked={form.isNew}
              onChange={handleChange}
            />
          </div>

        </div>

        {preview && (
          <div className="mb-3">
            <img src={preview} alt="preview" style={{ height: "100px" }} />
          </div>
        )}

        <button className="btn btn-primary">
          {editId ? "Update Product" : "Create Product"}
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Top Deal</th>
            <th>Shop</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map(p => (
              <tr key={p.id}>
                <td>
                  {p.image && (
                    <img
                      src={`${BASE_URL}${p.image}`}
                      alt=""
                      style={{ height: "60px" }}
                    />
                  )}
                </td>
                <td>{p.title}</td>
                <td>{getCategoryName(p.CategoryId)}</td>
                <td>${p.price}</td>
                <td>{p.rating}</td>
                <td>{p.showInShop ? "Yes" : "No"}</td>
                <td>{p.isTopDeal ? "Yes" : "No"}</td>
                {/* <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td> */}
                <td>

<button
className="btn btn-sm btn-warning me-2"
onClick={() => handleEdit(p)}
>
Edit
</button>

<button
className="btn btn-sm btn-danger me-2"
onClick={() => handleDelete(p.id)}
>
Delete
</button>

<button
className={`btn btn-sm ${p.isTopDeal ? "btn-success" : "btn-secondary"}`}
onClick={() => toggleTopSeller(p)}
>
{p.isTopDeal ? "Remove Top Seller" : "Add Top Seller"}
</button>

</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default Products;