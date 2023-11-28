import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AddProduct } from "./features/product/AddProduct";
import ProductsPage from "./features/product/productsPage";
import { EditProduct } from "./features/product/EditProduct";
import Navbar from "./components/Navbar";
import CartProductsPage from "./components/cartProductsPage";
import Login from "./components/Login";

function App() {
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
