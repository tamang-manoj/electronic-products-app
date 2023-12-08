import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddProduct } from "./features/product/AddProduct";
import ProductsPage from "./features/product/productsPage";
import { EditProduct } from "./features/product/EditProduct";
import Navbar from "./components/Navbar";
import CartProductsPage from "./features/cart/cartProductsPage";
import Login from "./features/character/Login";
import Protected from "./components/Protected";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Protected />}>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:idInParam" element={<EditProduct />} />
            <Route path="/cart" element={<CartProductsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
