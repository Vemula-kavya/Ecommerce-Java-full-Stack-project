import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
      });
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <h1 style={styles.title}>🛍️ Online Store</h1>

      {/* NAV BAR */}
      <div style={styles.nav}>
        <button style={styles.navBtn} onClick={() => navigate("/cart")}>
          🛒 View Cart
        </button>

        <button style={styles.navBtn} onClick={() => navigate("/orders")}>
          📦 View Orders
        </button>

        <button style={{ ...styles.navBtn, backgroundColor: "#dc3545" }} onClick={logout}>
          🚪 Logout
        </button>
      </div>

      <hr />

      <h2 style={styles.subTitle}>Available Products</h2>

      {/* PRODUCTS */}
      <div style={styles.grid}>
        {products.length === 0 ? (
          <p style={styles.empty}>No products available</p>
        ) : (
          products.map((p) => (
            <div key={p.id} style={styles.card}>
              
              <h3 style={styles.name}>{p.name}</h3>

              <p style={styles.desc}>{p.description}</p>

              <p style={styles.price}>₹{p.price}</p>

              <p style={styles.stock}>
                Stock: {p.stock}
              </p>

              <button
                onClick={() => addToCart(p)}
                style={styles.button}
              >
                Add to Cart 🛒
              </button>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Product;

/* 🎨 STYLES */
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh"
  },

  title: {
    textAlign: "center",
    marginBottom: "15px"
  },

  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px"
  },

  navBtn: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white"
  },

  subTitle: {
    textAlign: "center",
    marginBottom: "20px"
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px"
  },

  card: {
    width: "250px",
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  name: {
    margin: "5px 0"
  },

  desc: {
    fontSize: "14px",
    color: "#555"
  },

  price: {
    color: "green",
    fontWeight: "bold"
  },

  stock: {
    fontSize: "13px",
    color: "gray"
  },

  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px"
  },

  empty: {
    textAlign: "center",
    color: "gray"
  }
};