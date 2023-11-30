import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AddProduct } from "./features/product/AddProduct";
import ProductsPage from "./features/product/productsPage";
import { EditProduct } from "./features/product/EditProduct";
import Navbar from "./components/Navbar";
import CartProductsPage from "./components/cartProductsPage";
import Login from "./components/Login";
import { useAppDispatch } from "./app/hooks";
import { initialData } from "./features/product/productsSlice";
import { initialCartData } from "./features/role/cartSlice";
import { useEffect } from "react";

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
