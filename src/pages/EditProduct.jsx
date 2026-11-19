
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import "../styles/ProductForm.css";

function EditProduct() {
  const { id } = useParams();
  const { products, updateProduct, loading } = useProducts();
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

  useEffect(() => {
    const product = products.find(
      (item) => String(item.id) === String(id)
    );

    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        origin: product.origin || "",
        price: product.price ?? "",
        image: product.image || "",
        inStock: product.inStock ?? true,
      });
    }
  }, [products, id]);

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

      await updateProduct(id, {
        ...formData,
        price: Number(formData.price),
      });

      navigate("/products");
    } catch (err) {
      setError(err.message || "Could not update product.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="loading-message">Loading product...</p>;
  }

  const productExists = products.some(
    (product) => String(product.id) === String(id)
  );

  if (!productExists) {
    return (
      <section className="product-form-page">
        <div className="form-heading">
          <h1>Product Not Found</h1>
          <button onClick={() => navigate("/products")}>
            Back to Products
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="product-form-page">
      <div className="form-heading">
        <p className="section-label">BREW HAVEN ADMIN</p>
        <h1>Edit Coffee Product</h1>
        <p>Update the details of your coffee product.</p>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="origin">Country of Origin</label>
        <input
          id="origin"
          name="origin"
          type="text"
          value={formData.origin}
          onChange={handleChange}
        />

        <label htmlFor="price">Price (KSh)</label>
        <input
          id="price"
          name="price"
          type="number"
          min="1"
          value={formData.price}
          onChange={handleChange}
        />

        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
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
          {saving ? "Saving Changes..." : "Update Product"}
        </button>
      </form>
    </section>
  );
}

export default EditProduct;
