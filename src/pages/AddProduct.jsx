
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import "../styles/ProductForm.css";

function AddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    origin: "",
    price: "",
    image: "",
    inStock: true,
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.origin.trim() ||
      !formData.price ||
      !formData.image.trim()
    ) {
      setError("Please complete all fields.");
      return;
    }

    try {
      setSaving(true);

      await addProduct({
        ...formData,
        price: Number(formData.price),
      });

      navigate("/products");
    } catch (err) {
      setError(err.message || "Could not add product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="product-form-page">
      <div className="form-heading">
        <p className="section-label">BREW HAVEN ADMIN</p>
        <h1>Add a Coffee Product</h1>
        <p>Introduce a new flavour to our collection.</p>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Caramel Latte"
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the coffee..."
          rows="4"
        />

        <label htmlFor="origin">Country of Origin</label>
        <input
          id="origin"
          name="origin"
          type="text"
          value={formData.origin}
          onChange={handleChange}
          placeholder="e.g. Kenya"
        />

        <label htmlFor="price">Price (KSh)</label>
        <input
          id="price"
          name="price"
          type="number"
          min="1"
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g. 1500"
        />

        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/coffee.jpg"
        />

        <label className="stock-checkbox">
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
          />
          Available in stock
        </label>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </section>
  );
}

export default AddProduct;
