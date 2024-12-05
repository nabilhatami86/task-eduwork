import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import NavbarComponent from "../components/Navbar/Navbar";
import FooterComponent from "../pages/Footer/Footer";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Product from "../components/Product/ProductList";
import Cart from "../components/Cart/Cart";
import Address from "../components/Address/Address";
import Order from "../components/Order/Order";

const RouterAplication = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };
  return (
    <div>
      <NavbarComponent onSearchChange={handleSearchChange} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product searchTerm={searchTerm} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/order" element={<Order />} />
      </Routes>

      <FooterComponent />
    </div>
  );
};

export default RouterAplication;
