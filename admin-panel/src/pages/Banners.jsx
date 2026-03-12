import { useEffect, useState } from "react";
import API from "../services/api";

const Banners = () => {

  const [banners, setBanners] = useState([]);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);

  const initialForm = {
    title: "",
    subtitle: "",
    buttonText: "",
    backgroundColor: "#1ca7c9",
    position: "hero",
    image: null
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await API.get("/banners");
      setBanners(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });

    try {
      if (editId) {
        await API.put(`/banners/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await API.post("/banners", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      setEditId(null);
      setForm(initialForm);
      setPreview(null);
      fetchBanners();

    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (banner) => {
    setEditId(banner.id);
    setForm({
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      buttonText: banner.buttonText || "",
      backgroundColor: banner.backgroundColor || "#1ca7c9",
      position: banner.position || "hero",
      image: null
    });

    setPreview(`http://localhost:5000/uploads/${banner.image}`);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/banners/${id}`);
      fetchBanners();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTopSellerBanner = async (banner) => {
  try {

    const formData = new FormData();

    formData.append("title", banner.title);
    formData.append("subtitle", banner.subtitle);
    formData.append("buttonText", banner.buttonText);
    formData.append("backgroundColor", banner.backgroundColor);

    const newPosition =
      banner.position === "top-seller" ? "hero" : "top-seller";

    formData.append("position", newPosition);

    await API.put(`/banners/${banner.id}`, formData);

    fetchBanners();

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>
      <h4 className="mb-4">Manage Banners</h4>

      <form onSubmit={handleSubmit} className="mb-5">

        <div className="row">

          <div className="col-md-6">
            <input
              className="form-control mb-3"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control mb-3"
              name="subtitle"
              placeholder="Subtitle"
              value={form.subtitle}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control mb-3"
              name="buttonText"
              placeholder="Button Text"
              value={form.buttonText}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="mb-1">Background Color</label>
            <input
              type="color"
              className="form-control form-control-color mb-3"
              name="backgroundColor"
              value={form.backgroundColor}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <select
              className="form-control mb-3"
              name="position"
              value={form.position}
              onChange={handleChange}
            >
              <option value="hero">Hero</option>
              <option value="right">Right Banner</option>
              <option value="promo">Promo Full Width</option>
              <option value="top-deals">Top Deals Banner</option>
              <option value="popular-left">Popular Section Left</option>
              <option value="popular-right">Popular Section Right</option>
            </select>
          </div>

          <div className="col-md-6">
            <input
              type="file"
              className="form-control mb-3"
              onChange={handleImageChange}
            />
          </div>

        </div>

        {preview && (
          <div className="mb-3">
            <img
              src={preview}
              alt="preview"
              style={{ height: "120px", objectFit: "cover" }}
            />
          </div>
        )}

        <button className="btn btn-primary">
          {editId ? "Update Banner" : "Add Banner"}
        </button>

      </form>

      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((b) => (
            <tr key={b.id}>
              <td>
                {b.image && (
                  <img
                    src={`http://localhost:5000/uploads/${b.image}`}
                    alt=""
                    style={{ height: "60px" }}
                  />
                )}
              </td>
              <td>{b.title}</td>
              <td>{b.position}</td>
              <td>

<button
className="btn btn-warning btn-sm me-2"
onClick={() => handleEdit(b)}
>
Edit
</button>

<button
className="btn btn-danger btn-sm me-2"
onClick={() => handleDelete(b.id)}
>
Delete
</button>

<button
className={`btn btn-sm ${b.position === "top-seller" ? "btn-success" : "btn-secondary"}`}
onClick={() => toggleTopSellerBanner(b)}
>
{b.position === "top-seller"
? "Remove Top Seller"
: "Add Top Seller"}
</button>

</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Banners;