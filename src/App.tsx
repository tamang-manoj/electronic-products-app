import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";

import { AddProduct } from "./features/product/AddProduct";
import ProductsPage from "./features/product/productsPage";
import { EditProduct } from "./features/product/EditProduct";
import Navbar from "./components/Navbar";
import CartProductsPage from "./features/cart/cartProductsPage";

import { getProducts } from "./features/product/productsSlice";
import Login from "./features/character/Login";
import { getCartData } from "./features/cart/cartSlice";
import ErrorPage from "./components/ErrorPage";

function App() {
  const dispatch = useAppDispatch();

  const characters = useAppSelector((state) => state.characters);
  const loggedIn = characters.loggedIn;
  const loggedInRole = characters.loggedInRole;

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCartData());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductsPage />
              </>
            }
          />
          <Route
            path="/products/addProduct"
            element={loggedIn ? <AddProduct /> : <ErrorPage />}
          />

          <Route
            path="/products/edit/:idInParam"
            element={loggedIn ? <EditProduct /> : <ErrorPage />}
          />

          <Route
            path="/cart"
            element={loggedIn ? <CartProductsPage /> : <ErrorPage />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
