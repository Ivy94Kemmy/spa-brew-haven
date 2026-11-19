
import { useState } from "react";
import useProducts from "../hooks/useProducts";
import { Link } from "react-router-dom";
import "../styles/Products.css";

function Products() {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="loading-message">Loading coffee products...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <section className="products-page">
      <div className="products-heading">
        <p className="section-label">OUR COLLECTION</p>
        <h1>Explore Our Coffee</h1>
        <p>Find your next favourite cup.</p>
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="Search coffee by name..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        aria-label="Search coffee products"
      />

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <div className="product-details">
              <p className="product-origin">{product.origin}</p>
              <h2>{product.name}</h2>
              <p>{product.description}</p>

              <div className="product-card-bottom">
                <strong>KSh {Number(product.price).toLocaleString()}</strong>
                <Link to={`/products/${product.id}/edit`}>
                  Edit Product
                </Link>
              </div>

              <span className={product.inStock ? "in-stock" : "out-stock"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="empty-message">No coffee products found.</p>
      )}
    </section>
  );
}

export default Products;
