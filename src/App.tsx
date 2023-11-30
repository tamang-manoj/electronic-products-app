import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";

import { AddProduct } from "./features/product/AddProduct";
import ProductsPage from "./features/product/productsPage";
import { EditProduct } from "./features/product/EditProduct";
import Navbar from "./components/Navbar";
import CartProductsPage from "./features/cart/cartProductsPage";

import { initialData } from "./features/product/productsSlice";
import Login from "./features/character/Login";
import { initialCartData } from "./features/cart/cartSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialData());
    dispatch(initialCartData());
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
          <Route path="/products/addProduct" element={<AddProduct />} />

          <Route path="/products/edit/:idInParam" element={<EditProduct />} />

          <Route path="/cart" element={<CartProductsPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
