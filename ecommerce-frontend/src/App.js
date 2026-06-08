import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Payment from "./pages/./Payment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;