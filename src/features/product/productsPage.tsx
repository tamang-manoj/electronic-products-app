import CardComponent from "./CardComponent";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { initialData } from "./productsSlice";

const ProductsPage = () => {
  const data = useAppSelector((state) => state.products.data);
  // console.log(data);

  const role = useAppSelector((state) => state.roleStatus.role);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialData());
  }, []);

  return (
    <>
      <div className="products-container">
        {data.map((product) => (
          <CardComponent key={product.id} product={product} role={role} />
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
