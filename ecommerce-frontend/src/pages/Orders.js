import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    axios.get("http://localhost:8080/api/orders")
      .then((res) => {
        console.log("API DATA:", res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log("ERROR:", err));
  };

  const deleteOrder = (id) => {
    axios.delete(`http://localhost:8080/api/orders/${id}`)
      .then(() => {
        alert("Order deleted successfully 👍");
        loadOrders(); // refresh list
      })
      .catch((err) => console.log("DELETE ERROR:", err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🧾 My Orders
      </h2>

      {orders.length > 0 ? (
        orders.map((o) => (
          <div
            key={o.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            
            <div>
              <p><b>Order ID:</b> {o.id}</p>
              <p><b>Total:</b> ₹{o.totalAmount}</p>
              <p><b>Status:</b> {o.status}</p>

              {/* ⭐ ADDED DATE HERE */}
              <p><b>Date:</b> {o.orderDate ? new Date(o.orderDate).toLocaleString() : "N/A"}</p>
            </div>

            <button
              onClick={() => deleteOrder(o.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>

          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>
          No Orders Found
        </p>
      )}
    </div>
  );
}

export default Orders;