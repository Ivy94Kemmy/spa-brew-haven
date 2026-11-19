
import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3002/coffee";

  // GET: Fetch all coffee products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch coffee products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // POST: Add a new coffee product
  const addProduct = async (newProduct) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error("Failed to add coffee product");
    }

    const savedProduct = await response.json();

    setProducts((currentProducts) => [
      ...currentProducts,
      savedProduct,
    ]);

    return savedProduct;
  };

  // PATCH: Update an existing coffee product
  const updateProduct = async (id, updatedProduct) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) {
      throw new Error("Failed to update coffee product");
    }

    const savedProduct = await response.json();

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        String(product.id) === String(id)
          ? savedProduct
          : product
      )
    );

    return savedProduct;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
