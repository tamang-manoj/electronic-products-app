import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import CardComponent from "./CardComponent";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const ProductsPage = () => {
  const products = useSelector((state: RootState) => state.products);
  //   console.log(products);
  const navigate = useNavigate();

  const role = useAppSelector((state) => state.role.role);
  // console.log(role);

  return (
    <>
      <div className="products-container">
        {products.map((product) => (
          <CardComponent key={product.id} product={product} role={role} />
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
