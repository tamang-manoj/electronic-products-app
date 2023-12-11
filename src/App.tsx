import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddProduct } from "./features/product/AddProduct";
import ProductsPage from "./features/product/productsPage";
import { EditProduct } from "./features/product/EditProduct";
import Navbar from "./components/Navbar";
import CartProductsPage from "./features/cart/cartProductsPage";
import Login from "./features/character/Login";

import ErrorPage from "./components/ErrorPage";
import ProtectedUser from "./components/ProtectedUser";
import ProtectedAdmin from "./components/ProtectedAdmin";
import { useEffect } from "react";
import { setCharInfo } from "./features/character/characterSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const value = localStorage.getItem("persist_login");
  let persistedLog: any;
  if (value) {
    persistedLog = JSON.parse(value);
  }
  const isLoggedIn = persistedLog?.isLoggedIn;
  const role = persistedLog?.role;

  useEffect(() => {
    dispatch(setCharInfo({ isLoggedIn, role }));
  }, [isLoggedIn, role, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedUser />}>
            <Route path="/cart" element={<CartProductsPage />} />
          </Route>

          <Route element={<ProtectedAdmin />}>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:idInParam" element={<EditProduct />} />
          </Route>

          <Route path={"*"} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
