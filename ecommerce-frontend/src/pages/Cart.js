import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Cart() {

  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    axios.post("http://localhost:8080/api/orders", {
      totalAmount: total
    })
    .then(() => {
      localStorage.removeItem("cart");
      navigate("/orders");
    })
    .catch(err => console.log(err));
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>🛒 My Cart</h1>

      {cart.length > 0 ? (
        cart.map((item, i) => (
          <div key={i} style={styles.card}>
            <h3 style={styles.name}>{item.name}</h3>
            <p style={styles.price}>₹{item.price}</p>
          </div>
        ))
      ) : (
        <p style={styles.empty}>Your cart is empty 😔</p>
      )}

      <div style={styles.summary}>
        <h2>Total: ₹{total}</h2>
      </div>

      <button
        onClick={placeOrder}
        style={styles.button}
      >
        Place Order
      </button>
      <button
  onClick={() => navigate("/payment")}
  style={{
    marginTop: "10px",
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px"
  }}
>
  Proceed to Payment
</button>

    </div>
  );
}

export default Cart;

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "Arial"
  },

  title: {
    textAlign: "center",
    marginBottom: "20px"
  },

  card: {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },

  name: {
    margin: 0
  },

  price: {
    color: "green",
    fontWeight: "bold"
  },

  summary: {
    marginTop: "20px",
    textAlign: "right"
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px"
  },

  empty: {
    textAlign: "center",
    color: "gray"
  }
};