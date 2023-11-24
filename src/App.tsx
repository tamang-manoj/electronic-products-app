import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AddProduct } from "./features/product/AddProduct";
import ProductsPage from "./features/product/productsPage";
import { EditProduct } from "./features/product/EditProduct";
import Navbar from "./components/Navbar";
import CartProductsPage from "./components/cartProductsPage";

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

          <Route path="/products/edit/:productId" element={<EditProduct />} />

          <Route path="/cart" element={<CartProductsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
