import CardComponent from "./CardComponent";
import { useAppSelector } from "../../app/hooks";

const ProductsPage = () => {
  const products = useAppSelector((state) => state.products);
  // console.log(products.data);
  const data = products.data;
  const isLoading = products.isLoading;

  const role = useAppSelector((state) => state.roleStatus.role);

  return (
    <>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="products-container">
          {data.map((product) => (
            <CardComponent key={product.id} product={product} role={role} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsPage;
