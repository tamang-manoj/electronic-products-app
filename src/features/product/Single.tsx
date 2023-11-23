import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const SingleProduct = () => {
  const { productId } = useParams();

  const product = useAppSelector((state) =>
    state.products.find((product) => product.id === productId)
  );
  console.log(product);

  if (!product) {
    return <h1>Post not found!</h1>;
  }

  return (
    <div>
      <div key={product.id} className="product-card">
        <div className="image-container">
          <img src={product.imgFile} style={{ height: "100%" }} />
        </div>

        <div className="description">
          <h3>{product.productName}</h3>
          <h5>Category: {product.productCategory}</h5>
          <h5>Price: {product.productPrice}</h5>
          <h5>Available: {product.productAvailable}</h5>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
