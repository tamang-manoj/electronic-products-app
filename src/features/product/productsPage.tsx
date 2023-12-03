import CardComponent from "./CardComponent";
import { useAppSelector } from "../../app/hooks";

const ProductsPage = () => {
  const products = useAppSelector((state) => state.products);
  // console.log(products.data);
  const data = products.data;
  // console.log(data);
  const isLoading = products.isLoading;

  return (
    <>
      {isLoading ? (
        <div className="empty-product">
          <h1>Loading...</h1>
        </div>
      ) : data.length !== 0 ? (
        <div className="products-container">
          {data.map((product) => (
            // <CardComponent key={product.id} product={product} />
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
