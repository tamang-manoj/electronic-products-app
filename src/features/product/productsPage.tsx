import CardComponent from "./CardComponent";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Loading from "../cart/Loading";
import { useEffect } from "react";
import { getProducts } from "./productsSlice";

const ProductsPage = () => {
  const products = useAppSelector((state) => state.products);
  // console.log(products.data);
  const data = products.data;
  // console.log(data);
  const isLoading = products.isLoading;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : data.length !== 0 ? (
        <div className="card-container">
          {data.map((product) => (
            <CardComponent key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-product">
          <h1>No Products To Show</h1>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
