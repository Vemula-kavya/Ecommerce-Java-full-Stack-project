import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      // SUCCESS
      alert("Login Successful 👍");

      // STORE JWT TOKEN
      localStorage.setItem("token", res.data);

      // STORE USER EMAIL (optional)
      localStorage.setItem("userEmail", email);

      // REDIRECT
      navigate("/products");

    } catch (err) {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={login}>

        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to your account</p>

        <input
          type="email"
          placeholder="Email Address"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;

// ⭐ STYLES MUST BE OUTSIDE FUNCTION
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
  },

  card: {
    background: "white",
    padding: "40px",
    width: "320px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },

  title: {
    marginBottom: "5px",
    color: "#333",
  },

  subtitle: {
    marginBottom: "20px",
    color: "gray",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#4facfe",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};