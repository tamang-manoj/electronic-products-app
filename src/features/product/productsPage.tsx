import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import CardComponent from "./CardComponent";

import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const products = useSelector((state: RootState) => state.products);
  //   console.log(products);
  const navigate = useNavigate();

  return (
    <>
      <div className="titleAndButton">
        <h1>Electronic Products</h1>

        <button
          onClick={() => {
            navigate("/products/addProduct");
          }}
        >
          Add New Product
        </button>
      </div>

      <div className="products-container">
        {products.map((product) => (
          <CardComponent key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
