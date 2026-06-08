import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [method, setMethod] = useState("card");
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Payment Successful 👍 Order Placed!");

    localStorage.removeItem("cart");
    navigate("/orders");
  };

  return (
    <div style={styles.container}>

      <h2>💳 Payment Page</h2>

      <div style={styles.box}>

        <h3>Select Payment Method</h3>

        <label>
          <input
            type="radio"
            value="card"
            checked={method === "card"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Credit / Debit Card
        </label>

        <br />

        <label>
          <input
            type="radio"
            value="cod"
            checked={method === "cod"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <br /><br />

        <button onClick={handlePayment} style={styles.button}>
          Pay Now
        </button>

      </div>
    </div>
  );
}

export default Payment;

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    fontFamily: "Arial"
  },

  box: {
    border: "1px solid #ddd",
    padding: "20px",
    width: "300px",
    margin: "auto",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },

  button: {
    backgroundColor: "green",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};